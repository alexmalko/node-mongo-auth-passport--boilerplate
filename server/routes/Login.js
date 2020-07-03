const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); //validator
const User = require('../models/Users'); //bring in Users model
const bcrypt = require('bcryptjs'); //to encrypt the user
const jwt = require('jsonwebtoken'); //Jason Web Token for auth
const auth = require('../middleware/auth'); //brining in custom middleware

// @route GET /api/users
// @ desc get all users
// @access Public
router.get('/', async (req, res) => {
	try {
		const item = await User.find();
		res.json(item);
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ message: 'failed to Post' });
	}
});

// @route DELETE /api/users
// @ desc delete  user
// Delete
router.delete('/:id', auth, async (req, res) => {
	try {
		const deletedItem = await User.findById(req.params.id);
		await deletedItem.remove();
		res.json({ msg: 'Item removed', item: deletedItem });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ message: 'invalid ID' });
	}
});

// @route POST /api/login
// @ desc Authenticate user & get token
// @access   Public
router.post(
	'/',
	// Validator
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists()
		//
	],
	// Validator
	async (req, res) => {
		// Validator error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Validator erros

		const { name, email, password } = req.body; //destructuring request

		try {
			// check if user already exists
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
			}
			// check if user already exists

			//checking is the emails match
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
			}
			//checking is the emails match

			// res.send('success');

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
			//generating JWT for auth
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ message: 'failed to Post' });
		}
	}
);

module.exports = router;
