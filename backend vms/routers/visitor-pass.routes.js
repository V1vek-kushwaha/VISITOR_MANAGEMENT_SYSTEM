const express = require('express');
const router = express.Router();
const visitorPassController = require('../controllers/pass-generate/visitor-pass.controller');
const authMiddleware = require('../middleware/verifyToken'); // Optional if user is required

router.post('/visitor_pass/create', authMiddleware, visitorPassController.createVisitorPass);
router.get('/visitor_pass/getAllPass', visitorPassController.getAllVisitorPasses);
router.get('/visitor_pass/getByPassId/:id', visitorPassController.getVisitorPassById);
router.put('/visitor_pass/updatePass/:id', visitorPassController.updateVisitorPass);
router.delete('/visitor_pass/deletePass/:id', visitorPassController.deleteVisitorPass);

module.exports = router;
