import mongoose from "mongoose";
const ordersSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "please provide user id!"],
    },
    customerID: {
      type: String,
      required: [true, "please provide stripe customer id!"],
    },
    products: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    },
    status: {
      type: "String",
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
    paymentType: {
      type: "String",
      enum: ["cash", "card", "mpesa"],
      default: "card",
    },
    paymentIntent: {
      type: "String",
      required: [true, "please provide payment intent!"],
    },
    total: {
      type: Number,
      required: [true, "please provide total amount!"],
    },
    shipping: {
      type: String,
      //   required: [true, "please provide total amount!"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.orders ||
  mongoose.model("orders", ordersSchema);
