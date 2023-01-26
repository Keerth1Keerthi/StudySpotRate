const Joi = require('joi');

module.exports.placeSchema = Joi.object({
    place: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).single(),
        description: Joi.string().required(),
        //image: Joi.String().required()
    }).required()
})