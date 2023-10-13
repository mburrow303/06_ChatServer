const router = require('express').Router();
const Room = require('../models/message.rooms.model');
const User = require('../models/user.model');
const Message = require("../models/message.model")
const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

router.post('/create/:room_id', validateSession, async (req, res) => {
try {
   const message = new Date {
    year:,
    month:,
    day:,
    hour:,
    minutes:,
   }
} catch (error) {
  
}

});

module.exports = router;