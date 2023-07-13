import axios from "axios";
import { toast } from "react-hot-toast";

const Interceptor = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      switch (err.response.status) {
        case 401:
          toast.error(err.response.statusText);
          break;
        case 404:
          toast.error(err.response.statusText);
          break;
        case 409:
          toast.error(err.response.statusText);
          break;
        case 500:
          toast.error(err.response.statusText);
          break;
        case 503:
          toast.error(err.response.statusText);
          break;
        default:
          break;
      }
    }
  );
  return null;
};
export default Interceptor;
