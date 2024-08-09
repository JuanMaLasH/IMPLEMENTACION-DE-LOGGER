import { ProductModel } from "../daos/mongodb/models/products.model.js";
import { CartRepository } from "../repositories/cart.repository.js";
const cartRepository = new CartRepository();

export class ViewsManager {
    async renderProducts(req, res) {
        try {
            const { page = 1, limit = 3 } = req.query;
            const skip = (page - 1) * limit;
            const products = await ProductModel
                .find()
                .skip(skip)
                .limit(limit);
            const totalProducts = await ProductModel.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const nuevoArray = products.map(product => {
                const { _id, ...rest } = product.toObject();
                return { id: _id, ...rest }; 
            });
            const cartId = req.user.cart;
            res.render("products", {
                productos: nuevoArray,
                hasPrevPage,
                hasNextPage,
                prevPage: page > 1 ? parseInt(page) - 1 : null,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                currentPage: parseInt(page),
                totalPages,
                cartId
            });
        } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({
                status: 'error',
                error: "Error interno del servidor"
            });
        }
    }

    async renderCart(req, res) {
        const cartId = req.params.cid;
        try {
            const carrito = await cartRepository.obtenerProductosDeCarrito(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            let totalCompra = 0;
            const productosEnCarrito = carrito.products.map(item => {
                const product = item.product.toObject();
                const quantity = item.quantity;
                const totalPrice = product.price * quantity;
                totalCompra += totalPrice;
                return {
                    product: { ...product, totalPrice },
                    quantity,
                    cartId
                };
            });
            res.render("carts", { productos: productosEnCarrito, totalCompra, cartId });
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async renderLogin(req, res) {
        res.render("login");
    }

    async renderRegister(req, res) {
        res.render("register");
    }

    async renderRealTimeProducts(req, res) {
        try {
            res.render("realtimeproducts");
        } catch (error) {
            console.log("error en la vista real time", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async renderChat(req, res) {
        res.render("chat");
    }

    async renderHome(req, res) {
        res.render("home");
    }
}

