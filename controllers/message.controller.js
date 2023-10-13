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
    //const time = new Date().toLocaleString();
    
    const createMessage = {
      
      text: req.body.text,
      owner: req.user._id,
      room: req.params._id,
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

//* Update message


//* Delete message



module.exports = router;