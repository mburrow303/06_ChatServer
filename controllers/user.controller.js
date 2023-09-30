const router = require('express').Router();

const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13)
    })

    const newUser = await user.save()
    const token = jwt.sign({id: newUser._id}, 
      process.env.JWT, {expiresIn: '1 day'})
      res.status(200).json({
        user: newUser,
        message: 'Success! New User Created',
        token
      })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

module.exports = router;