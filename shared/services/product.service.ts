import axios from "axios";
import { IProducts, ISearchResults } from "../model/products.model";

const getAllProducts = (): Promise<IProducts[]> => {
  return axios.get("https://fakestoreapi.com/products").then((res) => res.data);
};
const getSearchResults = (query: string): Promise<{results: ISearchResults[]}> => {
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
const productServices = {
  getAllProducts,
  getSearchResults,
};
export { productServices };
