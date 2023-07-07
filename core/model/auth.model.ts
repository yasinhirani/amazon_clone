export interface IBase<T> {
  data: T;
}
export interface IAuthData {
  userName: string;
  userEmail: string;
  role: string;
}
export interface ILogin {
  success: boolean;
  message: string;
  authData: IAuthData;
}
export interface IRegister {
  success: boolean;
  message: string;
}
export interface IAuthDataContext {
  authData: IAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>;
}
export interface ILoginRes extends IBase<ILogin> {}
export interface IRegisterRes extends IBase<IRegister> {}
