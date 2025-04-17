const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routers");
const visitorRoutes = require("./visitors/visitor.router.js");
const visitorRole = require("./roles");
const visitorDeparment = require("./departments");
const visitorsType = require("./visitors_type.routes");
const nfc_cards= require("./nfcCards.routes");

// Combine routes with a base path
router.use("/auth", authRoutes);
router.use("/visitor", visitorRoutes);
router.use("/role", visitorRole);
router.use("/department", visitorDeparment);
router.use("/visitorstype", visitorsType);
router.use("/nfccard", nfc_cards);


module.exports = router;
