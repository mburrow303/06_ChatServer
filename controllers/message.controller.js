const router = require("express").Router();

const Message = require("../models/message.model");
const User = require("../models/user.model");
const validateSession = require("../middleware/validateSession");


function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
}

//* Create a message per room
router.post("/create/:id", validateSession, async (req, res) => {
  try {
    
    const createMessage = {
      //const time = new Date().toLocaleString();
      text: req.body.text,
      owner: req.user.id,
      room: req.params.id,
    };

    const message = new Message(createMessage);

    const newMessage = await message.save();

    res.status(200).json({
      message: "New Message Created!",
      newMessage,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Get all messages per room
router.get('/list/:id', async(req, res) => {
  try {
   const getAllMessages = await Message.find();
   getAllMessages.length > 0 ?
   res.status(200).json({getAllMessages})
   :
   res.status(404).json({message: "No Messages Found"})
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Update a message
router.patch("/:id", validateSession, async (req, res) => {
  try {
      
      let ownerId = req.user.id;
      let message = req.params.id;

      let updatedInfo = req.body;

      const updated = await Message.findOneAndUpdate({_id: message, owner: ownerId}, updatedInfo, {new: true});

      if (!updated) 
        throw new Error("Invalid Message/User Combination")

      res.status(200).json({
        message: "Updated Message!", 
        updated
      });
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Delete a message
router.delete('/:id', validateSession, async function(req, res) {
  try {

    let {id} = req.params;
    let ownerId = req.user.id;

    const deletedMessage = await Message.deleteOne({_id: id, owner: ownerId});

    if (!deletedMessage.deletedCount) {
      throw new Error('Message Not Found :(')
    }

    res.status(200).json({ 
      message:' Message Deleted!', 
      deletedMessage
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;