import joi from "joi";

const shortenerModel = joi.object({
    url: joi.string().required()
    .regex(/^[a-zA-Z0-9-]+[:./\\]+([a-zA-Z0-9 -./:=&"'?%+@#$!])+$/),
})



export default shortenerModel;
