const router = require("express").Router();
const { User, validate } = require("../models/user")
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  try {
    const {error} = validate(req.body)
    if(error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if(user)
      return res.status(409).send({ message: "User with given email already exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    await new User({ ...req.body, password: hashedPassword }).save();
    res.status(201).send({ message: "User created successfuly" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" })
  }
})

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log("🚀 ~ file: user.js ~ line 29 ~ router.get ~ users", users)
    if(!users)
      return res.status(404).send({ message: "No Users yet" })

    res.status(200).send({ users: users, message: "Successfully retrieved the users" })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
