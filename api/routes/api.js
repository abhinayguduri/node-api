const express = require('express');
const router = express.Router();
const  ApiController = require( '../controllers/api.js');


router.get('/states',ApiController.api_get_states);
router.get('/districts/:id',ApiController.api_get_districts);
router.get('/slots/:id',ApiController.api_get_slots);
router.get('/slotsforweek/:id',ApiController.api_get_slots_week);
module.exports = router; 