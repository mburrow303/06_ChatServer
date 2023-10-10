const router = require("./user.controller");
const Room = require("../models/message.rooms.model");
const Message = require("../models/message.model")
const User = require("../models/user.model");
const validateSession = require("../middleware/validateSession");

function errorResponse(res,err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

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

module.exports = router