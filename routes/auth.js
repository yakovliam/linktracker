const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation/validation');
const {loginValidation} = require('../validation/validation');
const jwt = require('jsonwebtoken');

router.post('/register', async (request, response) => {

    // validate request
    const {error} = registerValidation(request.body); // get error (if there is one)

    if (error) return response.status(400).send(error.details[0].message); // (error thrown) not valid, don't create

    // check if user is already in the database
    const emailExists = await User.findOne({email: request.body.email});
    if (emailExists) return response.status(400).send("Email already exists!");

    // hash password for entry into the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    // create user!
    const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword // use hashed password
    });

    try {
        // try to save user to the database
        await user.save();

        // respond to client with user's new Id
        response.send({userId: user.id});

    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/login', async (request, response) => {

    // validate request
    const {error} = loginValidation(request.body); // get error (if there is one)
    if (error) return response.status(400).send(error.details[0].message); // (error thrown) not valid, don't create

    // check if user is in the database
    const targetUser = await User.findOne({email: request.body.email});
    if (!targetUser) return response.status(400).send("(Email) or password is incorrect!"); // email doesn't exist, so we can't proceed!

    // check if the password is equal
    const validPass = await bcrypt.compare(request.body.password, targetUser.password);
    if (!validPass) return response.status(400).send("Email or (password) is incorrect!"); // password is wrong, so we can't proceed!

    // JSONWebToken for user to be able to have a session (create and assign)
    const token = jwt.sign({_id: targetUser._id}, process.env.TOKEN_SECRET);
    response.header("auth-token", token).send(token);

});


module.exports = router;