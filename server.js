const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const usersController = require('./controllers/users.js');

//middleware the restricts access to logged-in users only
const isSignedIn = require('./middleware/is-signed-in.js');
//middleware that makes the user object available to view templates via res.locals
const passUserToView = require('./middleware/pass-user-to-view.js');


//=== port stuff ============================================

const port = process.env.PORT ? process.env.PORT : '3000';

const path = require('path');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//=== middleware =======================================================

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);



//=== gets ===========================================================

app.use('/users', usersController);

//first, check if there is a valid user OR require a user to be signed in to view a page
app.use(passUserToView);

//then go to home page
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

// Users must be signed in to view any of the routes associated with their pantry
app.use('/auth', authController);
app.use(isSignedIn);

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use('/users/:userId/foods', foodsController);

//=== listen ========================================================== 

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
