import mongoose from "mongoose";

export async function connect() {
  await mongoose.connect(process.env.mongodb_connect_uri!);
}
