import axios from "axios";
import { ILoginRes, IRegisterRes } from "../model/auth.model";

const login = (values: {
  userEmail: string;
  password: string;
}): Promise<ILoginRes> => {
  return axios.post(
    "https://amazon-clone-backend-one.vercel.app/api/login",
    values
  );
};

const register = (values: {
  userName: string;
  userEmail: string;
  password: string;
}): Promise<IRegisterRes> => {
  return axios.post(
    "https://amazon-clone-backend-one.vercel.app/api/register",
    values
  );
};

const authService = { login, register };

export default authService;
