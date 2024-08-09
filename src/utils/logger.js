import winston from 'winston';
import node_env from "../config/config.js";

const niveles = {
    nivel: {
        fatal: 0, 
        error: 1, 
        warning: 2,
        info: 3, 
        http: 4, 
        debug: 5
    },
    colores: {
        fatal: "red", 
        error: "red", 
        warning: "yellow", 
        info: "green", 
        http: "magenta", 
        debug: "blue"
    }
}

const loggerDesarrollo = winston.createLogger({
    levels: niveles.nivel, 
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: niveles.colores}),
                winston.format.simple()
            )
        })
    ]
})

const loggerProduccion = winston.createLogger({
    levels: niveles.nivel, 
    transports: [
        new winston.transports.File({
            level: "error",
            filename: "./errors.log"
        })
    ]
})

const logger = node_env === "produccion" ? loggerProduccion : loggerDesarrollo; 

const addLogger = (req, res, next) => {
    req.logger = logger; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}

export default addLogger;
