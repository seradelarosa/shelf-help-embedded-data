const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/foods
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('foods/index.ejs', { foods: currentUser.pantry });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

// GET /users/:userId/foods/new
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

// Create ‘/users/:userId/foods’	POST
router.post('/', async (req, res) => {
    try {
        //extract user
        const currentUser = await User.findById(req.session.user._id);
        //transform user
        currentUser.pantry.push({ food: req.body.food });
        //load
        await currentUser.save();

        res.redirect('/users/${currentUser._id}/foods');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

// Show	‘/users/:userId/foods/:foodId’	GET
router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const food = currentUser.pantry.id(req.params.foodId);

        res.render('foods/show.ejs', { food });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// Delete	‘/users/:userId/foods/:itemId’	DELETE
router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const food = currentUser.pantry.id(req.params.foodId);

        food.deleteOne();

        currentUser.save();

        res.redirect('/users/${currentUser._id}/pantry');
    } catch (error) {
        console.log(error);
        
    };
});

// Edit	‘/users/:userId/foods/:foodId/edit’	GET
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', { user: currentUser, food: food });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Update	‘/users/:userId/foods/:itemId’	PUT
router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);

        food.set(req.body);
        await currentUser.save();
        
        res.redirect(`/users/${currentUser._id}/foods/${req.params.foodId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});


module.exports = router;