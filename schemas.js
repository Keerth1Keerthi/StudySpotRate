const Joi = require('joi');

module.exports.placeSchema = Joi.object({
    place: Joi.object({
        title: Joi.string().required(),
        address: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).single(),
        description: Joi.string().required(),
        //image: Joi.String().required()
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        text: Joi.string().required()
    }).required()
})