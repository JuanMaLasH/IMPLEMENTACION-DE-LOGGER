import { Command } from "commander";
const program = new Command();

program
    .option("--mode <mode>", "entorno de trabajo", "produccion")
    .option("-p <port>", "puerto donde se inicia el servidor", 8080);
program.parse();

export default program;