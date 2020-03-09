const router = require('express').Router();
const Link = require('../model/Link');

router.get('*', async function (req, res) {

    const path = req.path;
    const slug = path.replace("/", "");

    // try to find slug in database
    const targetLink = await Link.findOne({urlSlug: slug});

    if (!targetLink) {
        return res.status(404).redirect("../../"); // redirect: not found
    }

    // is found....get the redirect link!
    const url = targetLink.url;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //TODO HERE
    // increment clicks
    targetLink.clicks++;
    targetLink.save();

    res.redirect(url);

});

module.exports = router;