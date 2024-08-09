import { Schema, model, Types  } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Types.ObjectId, 
                ref: "products",
                required: true
            },
            quantity: {
                type:Number, 
                required: true
            }
        }
    ],
    user: {
        type: Types.ObjectId,
        ref: "Usuarios",
    }
})

cartSchema.pre('findOne', function (next) {
    this.populate('products.product', '_id title price');
    next();
});

export const CartModel = model("carts", cartSchema);