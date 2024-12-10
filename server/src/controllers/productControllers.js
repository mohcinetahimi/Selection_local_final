const fs = require("fs");
const path = require("path");


const FILE_PATH = path.join(__dirname, "../data/Products.json");
const IMAGE_DIR = path.join(__dirname, "../public/images/product");


const readData = () => {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
};

// Helper function to write data
const writeData = (data) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

// Controller to get all products
exports.getAllProducts = (req, res) => {
    try {
        const products = readData();
        res.status(200).json(products.products);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products", error });
    }
};

// Controller to add a new product
exports.addProduct = (req, res) => {
    
    try {
        const products = readData();
        const newProduct = req.body;
        console.log(req.body)
        const imageBase64 = newProduct.image; 
        const imageHoverBase64 = newProduct.imageHover; 
    

        const getExtension = (base64) => {
            const match = base64.match(/^data:image\/(\w+);base64,/);
            return match ? match[1] : null;
        };

        const imageExtension = getExtension(imageBase64);
        const imageHoverExtension = getExtension(imageHoverBase64);

        if (!imageExtension || !imageHoverExtension) {
            return res.status(500).json({ message: "Error Images" });
        }

        // Generate file paths
        const imagePath = path.join(IMAGE_DIR, `${products.nextId}.${imageExtension}`);
        const imageHoverPath = path.join(IMAGE_DIR, `h${products.nextId}.${imageHoverExtension}`);


        const saveBase64Image = (base64, filePath) => {
            const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFileSync(filePath, base64Data, "base64");
        };

        saveBase64Image(imageBase64, imagePath);
        saveBase64Image(imageHoverBase64, imageHoverPath);



        newProduct.imageSrc = `/images/product/${products.nextId}.${imageExtension}`;
        newProduct.imageHoverSrc = `/images/product/h${products.nextId}.${imageHoverExtension}`;



        newProduct.id = products.nextId;
        products.products.push(newProduct);

        products.nextId++;

        // Save updated data
        writeData(products);

        // Respond with the created product
        res.status(201).json(newProduct);
        
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error });
    }
};

// Controller to update a product
exports.updateProduct = (req, res) => {
    try {
        const products = readData();
        const productId = parseInt(req.params.id, 10);
        const updatedProduct = req.body;

        // Find the product by ID
        const index = products.products.findIndex((p) => p.id === productId);
        if (index === -1) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingProduct = products.products[index];

        // Handle image updates if new images are provided
        const getExtension = (base64) => {
            const match = base64.match(/^data:image\/(\w+);base64,/);
            return match ? match[1] : null;
        };

        if (updatedProduct.image) {
            const imageExtension = getExtension(updatedProduct.image);
            if (!imageExtension) {
                throw new Error("Invalid base64 image format for main image");
            }
            const imagePath = path.join(IMAGE_DIR, `${productId}.${imageExtension}`);

            // Save the new image
            const base64Data = updatedProduct.image.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFileSync(imagePath, base64Data, "base64");

            // Update the product's image path
            updatedProduct.imageSrc = `/images/product/${productId}.${imageExtension}`;
        }

        if (updatedProduct.imageHover) {
            const imageHoverExtension = getExtension(updatedProduct.imageHover);
            if (!imageHoverExtension) {
                throw new Error("Invalid base64 image format for hover image");
            }
            const imageHoverPath = path.join(IMAGE_DIR, `h${productId}.${imageHoverExtension}`);

            // Save the new hover image
            const base64Data = updatedProduct.imageHover.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFileSync(imageHoverPath, base64Data, "base64");

            // Update the product's hover image path
            updatedProduct.imageHoverSrc = `/images/product/h${productId}.${imageHoverExtension}`;
        }

        // Merge updates into the existing product
        products.products[index] = { ...existingProduct, ...updatedProduct };

        // Save updated data
        writeData(products);

        // Respond with the updated product
        res.status(200).json(products.products[index]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update product", error });
    }
};

// Controller to delete a product
exports.deleteProduct = (req, res) => {
    try {
        const products = readData();
        const productId = parseInt(req.params.id, 10);

        const filteredProducts = products.products.filter((p) => p.id !== productId);
        if (filteredProducts.length === products.products.length) {
            return res.status(404).json({ message: "Product not found" });
        }
        products.products  = filteredProducts;
        writeData(products);
        res.status(204).end(); // No content
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error });
    }
};