import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  code: {
    type:String, 
    unique: true, 
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  status: {
    type: Boolean, 
    required: true
  },
  stock: {
    type: Number, 
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  thumbnails: {
    type: [String]
}
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model("products", productSchema);