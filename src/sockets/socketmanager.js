import { Server } from "socket.io";
import { ProductRepository } from "../repositories/product.repository.js";
const productRepository = new ProductRepository(); 
import MessageModel from "../daos/mongodb/models/message.model.js";

export default class SocketManager {
    constructor(httpServer) {
        this.io = new Server(httpServer);
        this.initSocketEvents();
    }

    async initSocketEvents() {
        this.io.on("connection", async (socket) => {
            console.log("Un cliente se conectó");            
            socket.emit("productos", await productRepository.obtenerProductos() );
            socket.on("eliminarProducto", async (id) => {
                await productRepository.eliminarProducto(id);
                this.emitUpdatedProducts(socket);
            });
            socket.on("agregarProducto", async (producto) => {
                await productRepository.agregarProducto(producto);
                this.emitUpdatedProducts(socket);
            });
            socket.on("message", async data => {
                await MessageModel.create(data);
                const messages = await MessageModel.find();
                socket.emit("message", messages);
            });
        });
    }

    async emitUpdatedProducts(socket) {
        socket.emit("productos", await productRepository.obtenerProductos());
    }
}
