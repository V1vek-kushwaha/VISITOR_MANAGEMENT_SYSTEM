const express = require("express");
const router = express.Router();
const typeController = require("../controllers/visitors_type/visitors_type");

router.post("/create", typeController.createType);
router.get("/getAll", typeController.getTypes);
router.get("/getById/:id", typeController.getTypeById);
router.put("/update/:id", typeController.updateType);
router.delete("/delete/:id", typeController.deleteType);

module.exports = router;
