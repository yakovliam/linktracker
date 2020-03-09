const router = require('express').Router();
const User = require('../model/User');
const Link = require('../model/Link');
const jwt = require('jsonwebtoken');
const generator = require('../func/linkGenerator');

router.post('/create', async function (req, res) {

    // get jwt token
    //const token = req.cookies['auth-token'];
    const token = req.headers['auth-token'];
    let verified = false;
    let verifiedUser;

    if (token !== undefined) {
        verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verifiedUser)
            verified = true;
    }

    if (verified) {
        // get body (which contains the url that will be gone to)
        const url = req.body.url;

        if (!url) {
            return res.status(404).send("Invalid \"url\" parameter.");
        }

        // generate ne
        const slug = await generator.generate();
        
        //TODO Enter slug into database alongside url

    } else {
        res.status(403).send("Access Denied.")
    }
});

module.exports = router;