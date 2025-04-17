const express = require("express");
const router = express.Router();
const controller = require("../controllers/nfcCardController");

router.post("/create", controller.createCard);
router.get("/getAll", controller.getAllCards);
router.get("/getById/:id", controller.getCardById);
router.put("/update/:id", controller.updateCard);
router.delete("/delete/:id", controller.deleteCard);

module.exports = router;
