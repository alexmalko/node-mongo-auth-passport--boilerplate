const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); //validator
const Users = require('../models/Users'); //bring in Users model
const jwt = require('jsonwebtoken'); //Jason Web Token for auth
const bcrypt = require('bcryptjs'); //to encrypt the user

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
	'/',
	// Validator
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Validator

		const { name, email, password } = req.body; //destructuring request

		try {
			// check if user already exists
			let user = await Users.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
			}
			// check if user already exists

			//encrypting the user before saving user into the DB
			const hashedPassword = await bcrypt.hash(password, 10); //hashing the password

			// saving User into the database
			user = new Users({
				name: name,
				password: hashedPassword,
				email: email
			});
			await user.save();
			// res.json(item);
			// saving User into the database

			// Jasonwebtoken authentication
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '5 days' }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ message: 'failed to Post' });
		}
	}
);

module.exports = router;
