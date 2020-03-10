const router = require('express').Router();
const User = require('../model/User');
const Link = require('../model/Link');
const jwt = require('jsonwebtoken');
const Click = require('../model/Click');

router.get('/', async function (req, res) {

    // get jwt token
    const token = req.cookies['auth-token'];
    let verified = false;
    let verifiedUser; // temp var which is needed to process

    if (token !== undefined) {
        verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);

        // check existence
        const exists = await User.findOne({_id: verifiedUser._id});

        if (verifiedUser && exists)
            verified = true;
    }

    if (!verified) {
        // display the login page
        res.render('login/login_form', {title: "Log In"});
    } else {
        // get data
        const userLinks = await Link.find({userId: verifiedUser._id});

        res.render('profile/index', {
            title: 'Profile',
            username: verifiedUser.username,
            links: userLinks,
            baseOrigin: req.get('host')
        });
    }
});

router.get('/manage', async function (req, res) {

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
        // redirect to login
        res.redirect("../../");
    } else {
        const slug = req.query.slug;

        // does the user have perms to access this?
        const linkObj = await Link.findOne({userId: verifiedUser._id, urlSlug: slug});

        if (!linkObj) {
            return res.status(403).redirect("../../");
        }

        // get clicks
        const clicks = await Click.find({urlSlug: slug});

        // render
        res.render('manage/index', {
            title: "Manage",
            username: "username",
            link: linkObj,
            slug: linkObj.urlSlug, clicks: clicks
        });
    }
});

// get register view
router.get('/register', function (req, res) {
    res.render('register/register_form', {title: "Register"});
});

module.exports = router;