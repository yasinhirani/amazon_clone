import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  userEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password should not contain white space"),
});

const registerValidationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password should not contain white space"),
});

export { loginValidationSchema, registerValidationSchema };
