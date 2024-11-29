const Consultant = require('../models/consultantModel');
const Client = require("./../models/clientModel");
const Command = require("./../models/commandModel");
const jwt = require('jsonwebtoken');
const MetaData = require("./../models/dbMetaData")
require("dotenv").config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');





const consulantLogin = async (req, res) => {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        // Check if the consultant exists
        const consultant = await Consultant.findOne({ email });
        if (!consultant) {
            return res.status(404).json({ message: 'Consultant not found' });
        }

        // Check if the password is correct using comparePassword method
        const isMatch = await consultant.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const token = jwt.sign(
            { consultantId: consultant._id, fullName: consultant.fullName, email: consultant.email },
            jwtSecret
        );

        // Send the token in the response
        res.json({
            token,
            consultant: {
                id: consultant._id,
                fullName: consultant.fullName,
                email: consultant.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyConsultantIsLogin = async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, jwtSecret);

        // Check if the decoded token has the required properties
        if (!decoded.consultantId) {
            return res.status(401).json({ isAuthenticated: false });
        }

        // Find the consultant by ID
        const consultant = await Consultant.findById(decoded.consultantId);

        if (!consultant) {
            return res.status(401).json({ isAuthenticated: false });
        }

        res.status(200).json({ isAuthenticated: true });

    } catch (err) {
        res.status(401).json({ isAuthenticated: false });
    }
};

const addClient = async (req, res) => {
    try {
        // Create a new client using the request body
        const newClient = new Client(req.body);

        // Save the new client to the database
        const savedClient = await newClient.save();

        // Respond with the saved client data
        res.status(201).json({
            message: 'Client created successfully',
            client: savedClient
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: 'An error occurred while creating the client',
            error: error.message
        });
    }
};

const getClientById = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid client ID' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        // Retrieve all clients, sorted by creation date in descending order
        const clients = await Client.find().sort({ createdAt: -1 });

        // Respond with the clients data
        res.status(200).json({
            message: 'Clients retrieved successfully',
            clients: clients
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: 'An error occurred while retrieving clients',
            error: error.message
        });
    }
};

const createCommand = async (req, res) => {
    const { clientId, object } = req.body;
    try {
        let metaData = await MetaData.findOne();

        // If no record exists, create one
        if (!metaData) {
            metaData = new MetaData({
                lastClientId: 1,
                lastCommandId: 1,
            });
            await metaData.save();
        }

        const orderNumber = metaData.lastCommandId;
        metaData.lastCommandId++;

        await metaData.save(); // Ensure metaData is saved

        // Check if the client exists
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Create the new command
        const newCommand = new Command({
            orderNumber,
            consultantId: req.consultant._id, // Add the consultant ID from the authenticated user
            clientId,
            object,
            clientName: client.fullName
        });

        // Save the command
        const savedCommand = await newCommand.save();

        // Update the client's `beenConsulted` field and `commandId`
        client.beenConsulted = true;
        client.commandId = savedCommand._id;
        client.consultantId = req.consultant._id;
        await client.save();

        req.consultant.clients.push(client._id);
        await req.consultant.save();

        // Return the created command
        return res.status(201).json({ savedCommand });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCommandById = async (req, res) => {
    const { id } = req.params;

    try {
        const command = await Command.findById(id);
        if (!command) {
            return res.status(404).json({ message: 'Command not found' });
        }
        res.status(200).json(command);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid command ID' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllCommands = async (req, res) => {
    try {
        // Retrieve all commands, sorted by creation date (newest first)
        const commands = await Command.find().sort({ createdAt: -1 });  // Sort by createdAt, descending order (newest first)

        // Return the list of commands
        res.status(200).json({ commands });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const sendInvoiceToClient = async (req, res) => {
    try {
        const pdfBase64 = req.body.pdf;
        const email = req.body.email;
        const userName = req.body.userName;
        const language = req.body.language;
        const commandNumber = req.body.commandNumber;

        if (pdfBase64) {
            // Decode base64 string to binary
            const pdfBuffer = Buffer.from(pdfBase64, 'base64');

            // Configure Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GOOGLE_EMAIL,
                    pass: process.env.GOOGLE_EMAIL_PASS,
                },
            });

            let subject, html;
            
            if (language === 'francais') {
                subject = 'Facture de Selection Local';
                html = `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #fdf2f2;">
                        <h2 style="color: #d32f2f; text-align: center; margin-bottom: 20px;">Bonjour ${userName},</h2>
                        <p style="font-size: 16px; line-height: 1.5;">Nous espérons que vous allez bien. Vous trouverez ci-joint votre facture. Merci pour votre confiance !</p>
                        <p style="font-size: 16px; line-height: 1.5;">Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:contact@selection-local.ca" style="color: #d32f2f; text-decoration: none;">contact@selection-local.ca</a>.</p>
                        <p style="font-size: 16px; line-height: 1.5;">Vous pouvez également visiter notre site web : <a href="https://selection-local.ca" style="color: #d32f2f; text-decoration: none;">selection-local.ca</a></p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="https://selection-local.ca" style="display: inline-block; padding: 10px 20px; color: white; background-color: #d32f2f; border-radius: 5px; text-decoration: none;">Visitez notre site web</a>
                        </div>
                        <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;">
                        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">Cordialement,</p>
                        <p style="font-size: 14px; color: #333; text-align: center; font-weight: bold;">L'équipe de Selection Local</p>
                    </div>
                `;
            } else {
                // Default to English if not 'francais'
                subject = 'Selection Local Invoice';
                html = `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #fdf2f2;">
                        <h2 style="color: #d32f2f; text-align: center; margin-bottom: 20px;">Hello ${userName},</h2>
                        <p style="font-size: 16px; line-height: 1.5;">We hope you are doing well. Attached is your invoice. Thank you for your business!</p>
                        <p style="font-size: 16px; line-height: 1.5;">If you have any questions, feel free to contact us at <a href="mailto:contact@selection-local.ca" style="color: #d32f2f; text-decoration: none;">contact@selection-local.ca</a>.</p>
                        <p style="font-size: 16px; line-height: 1.5;">You can also visit our website: <a href="https://selection-local.ca" style="color: #d32f2f; text-decoration: none;">selection-local.ca</a></p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="https://selection-local.ca" style="display: inline-block; padding: 10px 20px; color: white; background-color: #d32f2f; border-radius: 5px; text-decoration: none;">Visit Our Website</a>
                        </div>
                        <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;">
                        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">Best regards,</p>
                        <p style="font-size: 14px; color: #333; text-align: center; font-weight: bold;">Selection Local Team</p>
                    </div>
                `;
            }
            
            const mailOptions = {
                from: 'Selectionlocal05@gmail.com',
                to: email,
                subject: subject,
                html: html,
                attachments: [
                    {
                        filename: `invoice_${userName}_${commandNumber}.pdf`,
                        content: pdfBuffer, // Use the buffer directly
                        contentType: 'application/pdf',
                    },
                ],
            };
            

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).send('Email sent successfully');
            } catch (error) {
                console.error(error);
                res.status(500).send('Error sending email');
            }
        } else {
            console.log("no pdf")
            res.status(400).send('No PDF data received');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal error occurred');
    }
};



module.exports = { consulantLogin, addClient, getAllClients, createCommand, getClientById, getCommandById, getAllCommands, verifyConsultantIsLogin, sendInvoiceToClient }; 