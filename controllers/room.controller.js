
//const router = require("./user.controller");
//const Message = require("../models/message.model")

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

// Updated Room
router.patch("/:id", validateSession, async (req, res) => {
  try {

    let _id = req.params.id;
    let owner = req.user.id;

    let updatedInfo = req.body;

    const updated = await Room.findOneAndUpdated({ id, owner}, updatedInfo, {new: true});

    if (!updated)
      throw new Error("Invalid Room/User Combination")

      res.status(200).json({
        message: `${updated._id} Updated Room!!`,
        updated
      });
    
  } catch (err) {
    errorResponse(res, err);
  }
});

// Delete Rooom
router.delete('/:id', validateSession, async function(req, res){
  try {
    let { id } = req.params;
    let owner = req.user.id;

    const deletedRoom = await Room.deleteOne({_id: id, owner});

    if(!deletedRoom.deleteCount) {
      throw new Error('No Room Avaiable')
    }

    res.status(200).json({
      message: 'Room Deleted!!!',
      deletedRoom
    });

  } catch (error) {
    errorResponse(res, err);
    
  }
})

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


module.exports = router;