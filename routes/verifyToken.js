const jwt = require('jsonwebtoken');

function auth(request, response, next) {

    const token = request.header('auth-token'); // get the auth token
    if (!token) return response.status(401).send("Access denied!"); // no token!

    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        request.user = verified;
    } catch (err) {
        return response.status(400).send("Invalid token."); // not verified
    }
}