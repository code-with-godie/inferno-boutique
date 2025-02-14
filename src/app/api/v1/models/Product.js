import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide product title!"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price!"],
    },
    images: [
      {
        secure_url: {
          type: String,
          required: [true, "please provide product image secure url!"],
        },
        public_id: {
          type: String,
          required: [true, "please provide product image public id!"],
        },
      },
    ],
    category: {
      type: String,
      required: [true, "please provide product category!"],
    },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus officia, accusamus quo optio ea ipsa quibusdam aut earum assumenda, nam doloremque quisquam voluptas id quas totam ipsam architecto itaque enim!",
    },
    size: [
      {
        size: { type: String },
        colors: [{ type: String }],
      },
    ],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    brand: { type: String, default: "" },
    climates: { type: [{ type: String }] },
    stock: { type: Number, default: 1 },
    gender: { type: String },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.products ||
  mongoose.model("products", productSchema);
