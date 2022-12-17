
import userModel from "../models/userModel.js"



export  async function userModelValidation (req, res, next) {
    const user = req.body

    
    const {error} = userModel.validate(user, {abortEarly:false}) // abortEarly:false = se existir mais de um erro traz todos
                                                                
    if(error) {
        const errors = error.details.map((d) => d.message)
        return res.status(422).send(errors)
        //422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
    }

    res.locals.user = user;
    
    next();

}



