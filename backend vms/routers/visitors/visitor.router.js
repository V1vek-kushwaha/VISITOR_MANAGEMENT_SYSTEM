const express = require("express");
const router = express.Router();

// Importing controllers
const { addVisitor } = require("../../controllers/visitors/createVisitor");
const { getAllVisitors } = require("../../controllers/visitors/getAllVisitors");
const { getVisitorById } = require("../../controllers/visitors/getVisitorById");
const { updateVisitor } = require("../../controllers/visitors/updateVisitor");
const { deleteVisitor } = require("../../controllers/visitors/deleteVisitor");

// Middleware for token verification
const verifyToken = require("../../middleware/verifyToken");

// Routes
router.post("/visitors-create", verifyToken, addVisitor);
router.get("/visitors-all", verifyToken, getAllVisitors);
router.get("/visitors/:id", verifyToken, getVisitorById);
router.put("/visitors-update/:id", verifyToken, updateVisitor);
router.delete("/visitors-delete/:id", verifyToken, deleteVisitor);


module.exports = router;
