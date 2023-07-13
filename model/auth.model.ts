import mongoose from "mongoose";

const orders = {
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  orderId: String,
  orderedOn: String,
};

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is required"],
    unique: false,
  },
  userEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
  },
  orders: [orders],
});
const Auth = mongoose.models.users || mongoose.model("users", authSchema);
export default Auth;
