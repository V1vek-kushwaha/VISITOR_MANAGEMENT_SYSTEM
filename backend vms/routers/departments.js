const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departments/createDepartment");

router.post("/create", departmentController.createDepartment);
router.get("/getall", departmentController.getDepartments);
router.get("/getbyid/:id", departmentController.getDepartmentById);
router.put("/update/:id", departmentController.updateDepartment);
router.delete("/delete/:id", departmentController.deleteDepartment);

module.exports = router;
