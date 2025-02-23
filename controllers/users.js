const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/userlist', async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.render('users/index.ejs', { users: allUsers })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// Route to view a user's pantry in read-only
router.get('/:userId/foods/read-only', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.render('users/show.ejs', { user, foods: user.pantry });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;