const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// CRUD
router.post('/create', visitController.createVisit);
router.get('/getAllVisits', visitController.getAllVisits);
router.get('/getUnit/:id', visitController.getVisitById);
router.put('/updateVisit/:id', visitController.updateVisit);
router.delete('/deleteVisit/:id', visitController.deleteVisit);

module.exports = router;
