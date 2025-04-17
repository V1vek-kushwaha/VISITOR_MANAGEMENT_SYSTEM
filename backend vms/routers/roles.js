const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roles/createRole");

router.post("/create", roleController.createRole);
router.get("/getAll", roleController.getRoles);
router.get("/getById:id", roleController.getRoleById);
router.put("/update/:id", roleController.updateRole);
router.delete("/delete/:id", roleController.deleteRole);

module.exports = router;
