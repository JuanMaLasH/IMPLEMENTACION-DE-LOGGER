import { connect } from "mongoose";
import configObject from "../config/config.js";

export class BaseDatos {
    static #instancia; 
    constructor(){
        connect(configObject.node_env);
    }
    
    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexion previa");
            return this.#instancia;
        }
        this.#instancia = new BaseDatos(); 
        console.log("Conexion exitosa");
        return this.#instancia;
    }
}

BaseDatos.getInstancia();