import { Errors } from "../services/errors/enum.js";

const manejadorError = (error, req, res, next) => {
    console.log(error.causa); 
    switch(error.code) {
        case Errors.TIPO_INVALIDO: 
            res.send({status: "error", error: error.nombre})
            break; 
        default: 
            res.send({status: "error", error: "Error desconocido"});
    }
}

export default manejadorError;  