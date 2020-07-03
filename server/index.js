const express = require('express');
const app = express();
const connectDB = require('./config/db'); //connect to mongo which is in config/db.js file
const posts = require('./routes/Posts');
const auth = require('./routes/Login');
const users = require('./routes/Users');
const dotenv = require('dotenv'); //loading environmental variable
const cors = require('cors');
const passport = require('passport'); //passport
const session = require('express-session'); //passport

// ---------------------------------- loading environmental variable ----------------------------------
dotenv.config();

// ---------------------------------- Passport ----------------------------------
// Passport config
require('./config/passportGoogle')(passport);

// Connect Database
connectDB();

// Init Middleware - replacement for bodyparser allows us to read data from the form
app.use(express.json());

// // to avoid CORS in the browser
// app.use(cors());

// ------------------------------------- Sessions ------------------------------------
// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	})
);
// ------------------------------------- Passport middleware ------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// -------------------------------------  Define Routes ------------------------------------
app.use('/api/posts', posts);
app.use('/api/login', auth);
app.use('/api/users', users);
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
