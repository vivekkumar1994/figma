const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const validateToken = require("../middleware/AuthMiddleware")

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password,phoneNumber,email } = req.body;
  if(!req.body.username || req.body.username ==="" || !req.body.password || req.body.password ==="" || !req.body.phoneNumber || req.bodyphoneNumber ==="" || !req.body.email || req.body.email ===""){
    return res.status(422).json({error:"Please filled the field correctly"});
  }
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      phoneNumber:phoneNumber,
      email:email
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  // const { username, password } = req.body;
  const body = req.body;
  const user = await Users.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
})

router.put("/resetpassword",async(req,res) => {

})




module.exports = router;  