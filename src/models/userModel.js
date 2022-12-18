import joi from "joi";

export const userModel = joi.object({
    name: joi.string().required().min(3),
    email:joi.string().email().required(),
    password:joi.string().required()
})

export const authModel = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})


