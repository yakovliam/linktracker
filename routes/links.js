const router = require('express').Router();
const Link = require('../model/Link');
const Click = require('../model/Click');

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

    // make new click object
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

    const click = new Click({
        ip: ip,
        urlSlug: slug
    });

    click.save();

    // increment clicks
    targetLink.clicks++;
    targetLink.save();

    res.redirect(url);

});

module.exports = router;