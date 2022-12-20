import joi from "joi";

// const shortenerModel = joi.object({
//     url: joi.string().required().uri()    
//     .regex(/^(http(s):\/\/.)[-a-zA-Z0-9@:%.~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%.~#?&//=]*)$/),
// })



  const shortenerModel = joi.object({
    url: joi.string().required().uri({
        scheme: [
          'git',
          /git\+https?/
        ]
      })    
   
})


export default shortenerModel;