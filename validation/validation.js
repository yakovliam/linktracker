const Joi = require('@hapi/joi');
// register validation
const registerValidation = (data) => {

    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

const urlValidation = (data) => {

    const schema = Joi.object({
        url: Joi.string().uri()
    });

    return schema.validate(data);

};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.urlValidation = urlValidation;