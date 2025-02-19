const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const foodSchema = new mongoose.Schema({
  foods: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// GUIDE
// Action	Route	HTTP Verb
// Index	‘/users/:userId/foods’	GET
// New	‘/users/:userId/foods/new’	GET
// Create	‘/users/:userId/foods’	POST
// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE
