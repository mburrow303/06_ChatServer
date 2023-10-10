// const router = require("./user.controller");
//? Do we need to require express or the above (line 1)? 
const router = require('express').Router();
const Room = require('../models/message.rooms.model');
const User = require('../models/user.model');
const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

//* Add a new Room
router.post('/create', validateSession, async (req, res) => {
console.log('hello');
 try {
 
 const createRoom = {
  title: req.body.title,
  description: req.body.description,
  messages: req.body.messages,
  ownerId: req.user._id
 }; 

 const room = new Room(createRoom);

 const newRoom = await room.save();

 res.status(200).json({
  message: 'New Room Created!',
  room: newRoom
 })
 } catch (err) {
  errorResponse(res, err);
 }
});

//* Get One Room
router.get('/create/:id', async(req, res) => {

  try {
    const singleRoom = await Room.findOne({_id:req.params.id});
    const user = await User.findById(singleRoom.owner);

   res.status(200).json({found: singleRoom, owner: User});
  } catch (err) {
   errorResponse(res,err);
  }
});

//* Get All Rooms
router.get('/list', async(req, res) => {
  try {

const getAllRooms = await Room.find();    

 getAllRooms.length > 0 ?
  res.status(200).json({getAllRooms})
  :
  res.status(404).json({message: "No Rooms Found"})
 } catch (err) {
  errorResponse(res, err);
 } 
});

//* Update a Room


//* Delete a Room


module.exports = router;