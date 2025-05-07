const express = require("express");
const router = express.Router();
const multer = require('multer');
// Configure Multer
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });


// Set up multer storage
const storageupdate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  }
});

const uploadupdate = multer({ storage: storageupdate });


// Importing controllers
const { addVisitor } = require("../../controllers/visitors/createVisitor");
const { getAllVisitors } = require("../../controllers/visitors/getAllVisitors");
const { getVisitorById } = require("../../controllers/visitors/getVisitorById");
const { updateVisitor } = require("../../controllers/visitors/updateVisitor");
const { deleteVisitor } = require("../../controllers/visitors/deleteVisitor");

// Middleware for token verification
const verifyToken = require("../../middleware/verifyToken");

router.post(
  '/visitors-create',
  verifyToken,
  upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'signature_image', maxCount: 1 }
  ]),
  addVisitor
);

// Update route with multer middleware
router.put(
  "/visitors-update/:id",
  verifyToken,
  uploadupdate.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "signature_image", maxCount: 1 },
  ]),
   updateVisitor
);
// Routes
// router.post("/visitors-create", verifyToken, addVisitor);
router.get("/visitors-all", verifyToken, getAllVisitors);
router.get("/visitors/:id", verifyToken, getVisitorById);
router.put("/visitors-update/:id", verifyToken, updateVisitor);
router.delete("/visitors-delete/:id", verifyToken, deleteVisitor);


module.exports = router;
