import { generarProductos } from "../utils/faker.js";

export class FakerManager {

    constructor() {
        this.products = [];
        this.currentId = 1;
    }

    async init() {
    }

    async addProductFromFaker() {
        const product = generarProductos();
        product.id = this.currentId++;
        this.products.push(product);
        return product.id;
    }

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        return this.products;
    }

    async getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    async updateProduct(id, fields) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return console.log(`Producto no encontrado ${id}`);
        }
        Object.assign(product, fields);
    }

    async deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
    }

}
