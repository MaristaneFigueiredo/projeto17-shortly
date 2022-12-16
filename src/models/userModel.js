import joi from "joi";

const userModel = joi.object({
    name: joi.string().required().min(3),
    email:joi.string().email().required(),
    password:joi.string().required()
})

export default userModel;