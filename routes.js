const express = require('express');
const router = new express.Router();
const User = require('./models');

//POST request handling
router.post('/user', async (req, res) => {
    try {
        const addUser = new User(req.body);
        console.log(req.body);
        const insertUser = await addUser.save();
        res.status(201).send(insertUser);
    } catch (e) {
        res.status(400).send(e)
    }
});

//GET request handling
router.get('/user', async (req, res) => {
    try {
        const getUsers = await User.find({}).sort({"name":1});
        res.send(getUsers);
    } catch (e) {
        res.status(400).send(e)
    }
});

//GET request for individual user
router.get("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await User.findById(_id);
        res.send(getUser);
    } catch (e) {
        res.status(400).send(e)
    }
});


//Update a request for individual user Individual data.
router.patch("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(getUser);
    } catch (e) {
        res.status(500).send(e)
    }
});


//Delete a request
router.delete("/user/:id", async (req, res) => {
    try {
        const getUser = await User.findByIdAndDelete(req.params.id);
        res.send(getUser);
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;