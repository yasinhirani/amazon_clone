import axios from "axios";
import { IProducts } from "../model/products.model";

const getAllProducts = (): Promise<IProducts[]> => {
  return axios.get("https://fakestoreapi.com/products").then((res) => res.data);
};
const productServices = {
  getAllProducts,
};
export { productServices };
