// const router = require("express").Router();
// const { User } = require("../models/user");
// const Joi = require("Joi");
// const bcrypt = require("bcrypt");

// router.post("/", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     console.log("🚀 ~ file: auth.js ~ line 13 ~ router.post ~ user", user)
//     if (!user)
//       return res.status(401).send({ message: "Invalid Email or Passowrd" });

//     const validPassword = await bcrypt.compare(req.body.password, user.password)
//     console.log("🚀 ~ file: auth.js ~ line 18 ~ router.post ~ validPassword", validPassword)
    

//     if (!validPassword)
//       return res.send(401).send({ message: "Invalid Email or Password" });

//     const token = user.generateAuthToken();
//     res.status(200).send({ data: token, message: "Logged in successfully" });
//   } catch (error) {
//     console.log(error);
//     // res.status(500).send({ message: "Internal Server Error" })
//   }
// });

// const validate = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required().label("Email"),
//     password: Joi.string().required().label("Password"),
//   });
//   return schema.validate(data);
// };

// module.exports = router;

const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		console.log("🚀 ~ file: auth.js ~ line 67 ~ router.post ~ error", error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;