import shortenerModel from "../models/shortenerModel.js";



export default function shortenersMiddleware(req, res, next)
{
    
    const url = req.body;


    try {


        const { error } = shortenerModel.validate(url, { abortEarly: false }); // abortEarly:false = se existir mais de um erro traz todos

        if (error) {
          const errors = error.details.map((d) => d.message);
          return res.status(422).send(errors);
          //422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
        }

        
        // const { body } = req
        // const { error } = shortenerModel.validate(body)

        //     if(error)
        //         return res.status(422).send({ message: error.details.map(e => e.message)})
            
        next()
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Erro inesperado no servidor!" });
    }
}