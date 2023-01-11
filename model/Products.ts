import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: Array<String>,
    required: true,
  },
  category: {
    type: Array<String>,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  images: {
    type: Array<URL>,
  },
});

const ProductModel =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default ProductModel;
