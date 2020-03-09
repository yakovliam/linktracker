const router = require('express').Router();
const User = require('../model/User');
const Link = require('../model/Link');
const jwt = require('jsonwebtoken');
const generator = require('../func/linkGenerator');
const {urlValidation} = require('../validation/validation');

router.post('/create', async function (req, res) {

    // get jwt token
    const token = req.cookies['auth-token'];
    //const token = req.headers['auth-token'];
    let verified = false;
    let verifiedUser;

    if (token !== undefined) {
        verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verifiedUser)
            verified = true;
    }

    // check validity of user
    const user = await User.findOne({_id: verifiedUser._id});

    if (!user) {
        return res.status(400).send("User does not exist.");
    }

    if (verified) {
        // get body (which contains the url that will be gone to)
        const url = req.body.url;

        if (!url) {
            return res.status(400).send("Invalid \"url\" parameter.");
        }

        // check validity of url
        const {error} = urlValidation({url: url}); // get error (if there is one)

        if (error) return res.status(400).send(error.details[0].message); // (error thrown) not valid, don't continue

        /* VALID URL, PROCEED */

        // generate new
        const slug = await generator.generate();

        const link = new Link({
            userId: user._id,
            url: url,
            urlSlug: slug
        });

        link.save();

        // return slug
        return res.send({slug: slug});

    } else {
        res.status(403).send("Access Denied.")
    }
});

module.exports = router;