import axios from "axios";
import {
  IOrdersReq,
  IOrdersRes,
  IProducts,
  ISearchResults,
  IUserOrdersRes,
} from "../model/products.model";

const getAllProducts = (): Promise<IProducts[]> => {
  return axios.get("https://fakestoreapi.com/products").then((res) => res.data);
};
const getSearchResults = (
  query: string
): Promise<{ results: ISearchResults[] }> => {
  return axios
    .get(`https://amazon-scraper-api11.p.rapidapi.com/search/${query}`, {
      params: {
        api_key: "a6b524dc87ad22814fe57302cea9cc20",
      },
      headers: {
        "X-RapidAPI-Key": "b270c8a6c1mshfa428feb3857501p110f3cjsn471755706752",
        "X-RapidAPI-Host": "amazon-scraper-api11.p.rapidapi.com",
      },
    })
    .then((res) => res.data);
};
const addOrders = (values: IOrdersReq): Promise<IOrdersRes> => {
  return axios.post(
    "https://amazon-clone-backend-one.vercel.app/api/addOrders",
    values
  );
};
const getUserOrders = (values: {
  userEmail: string;
}): Promise<IUserOrdersRes> => {
  return axios.post(
    "https://amazon-clone-backend-one.vercel.app/api/getUserOrders",
    values
  );
};
const productServices = {
  getAllProducts,
  getSearchResults,
  addOrders,
  getUserOrders,
};
export { productServices };
