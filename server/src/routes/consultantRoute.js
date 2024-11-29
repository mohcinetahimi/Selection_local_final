const express = require("express") ; 
const router = express.Router() ; 
const {consulantLogin , addClient, getAllClients , createCommand , getClientById , getCommandById , getAllCommands , verifyConsultantIsLogin ,sendInvoiceToClient } = require("../controllers/consultantControllers");
const {verifyConsultant} = require("../middlewares/authConsultant")




router.post("/login" , consulantLogin) ;

router.post("/addClient" , verifyConsultant , addClient) ; 

router.get("/getClientById/:id", verifyConsultant , getClientById) ; 

router.get("/getAllClients" , verifyConsultant , getAllClients)  ; 

router.post("/createCommand" , verifyConsultant , createCommand) ; 

router.get("/getCommandById/:id", verifyConsultant , getCommandById) ; 

router.get("/getAllCommands" , verifyConsultant , getAllCommands) ;

router.post("/sendInvoiceToClient" , verifyConsultant , sendInvoiceToClient)

router.post("/verifyConsultantIsLogin" , verifyConsultantIsLogin) ;



module.exports = router ; 