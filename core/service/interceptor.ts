import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Interceptor = () => {
  const axiosResponseInterceptor = axios.interceptors.response.use(
    (res: any) => {
      return Promise.resolve(res);
    },
    (err: AxiosError<any>) => {
      const { response } = err;
      const { status, statusText } = response as AxiosResponse;
      switch (status) {
        case 401:
          toast.error(statusText);
          break;
        case 404:
          toast.error(statusText);
          break;
        case 409:
          toast.error(statusText);
          break;
        case 500:
          toast.error(statusText);
          break;
        case 503:
          toast.error(statusText);
          break;
        default:
          Promise.reject(err);
          break;
      }
    }
  );
  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(axiosResponseInterceptor);
    };
  });
  return null;
};
export default Interceptor;
