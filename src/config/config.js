import dotenv from "dotenv";
import program from "../utils/commander.js";
const { mode } = program.opts();

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
})

const configObject = {
    node_env: process.env.NODE_ENV
}

export default configObject;
