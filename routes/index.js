const router = require('express').Router();
const User = require('../model/User');
const Link = require('../model/Link');
const jwt = require('jsonwebtoken');

/* get home */
router.get('/', async function (req, res) {

    // get jwt token
    const token = req.cookies['auth-token'];
    let verified = false;
    let verifiedUser;

    if (token !== undefined) {
        verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verifiedUser)
            verified = true;
    }
    if (!verified) {
        // display the login page
        res.render('login/login_form', {title: "Log In"});
    } else {
        // get user data
        const user = await User.findOne({_id: verifiedUser._id});

        const userLinks = await Link.find({userId: verifiedUser._id});

        res.render('profile/index', {title: 'Profile', username: user.username, links: userLinks});
    }
});

// get register view
router.get('/register', function (req, res) {
    res.render('register/register_form', {title: "Register"});
});

module.exports = router;