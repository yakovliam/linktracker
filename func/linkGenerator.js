const randomString = require("randomstring");
const Link = require('../model/Link');

async function generate() {

    let isValid = false;
    let threshold = 30;
    let currentCount = 0;
    let finalSlug;

    while (!isValid && currentCount <= threshold) {
        const slug = randomString.generate(6);

        // check to see if it already exists
        const exists = await Link.exists({urlSlug: slug});

        if (!exists) {
            finalSlug = slug;
            isValid = true;
        }

        currentCount++;
    }

    return finalSlug;
}

module.exports.generate = generate;