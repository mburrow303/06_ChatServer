const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const encryptPassword = (password) => {
  const encrypt = bcrypt.hashSync(password, 10);
  console.log("ENCRYPT:", encrypt);
};

//* Create an account
router.post("/signup", async (req, res) => {
  try {
    //? Create the new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
    });

    //? Add the new user to the database
    const newUser = await user.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: "1 day",
    });

    //? send a response to the client
    res.status(200).json({
      user: newUser,
      message: " New User Created, Success!!!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

//* Login to an account
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Email or Password does not match");

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1 day",
    });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Email or Password does not match");

    res.status(200).json({
      user,
      message: "Login Successful!!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

module.exports = router;
