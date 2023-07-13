"use client";
import { AuthDataContext } from "@/core/context";
import authService from "@/core/service/auth.service";
import { loginValidationSchema } from "@/core/validations/auth.validation";
import { Form, Formik, Field } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

interface ILoginValues {
  userEmail: string;
  password: string;
}

function Login() {
  const { setAuthData } = useContext(AuthDataContext);
  const router = useRouter();
  const [disabledState, setDisabledState] = useState<boolean>(false);
  const initialValues: ILoginValues = {
    userEmail: "",
    password: "",
  };
  const handleLogin = (values: ILoginValues) => {
    setDisabledState(true);
    authService.login(values).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        setAuthData(res.data.authData);
        localStorage.setItem("authData", JSON.stringify(res.data.authData));
        router.push("/");
        setDisabledState(false);
      } else {
        toast.error(res.data.message);
        setDisabledState(false);
      }
    }).catch(() => {
      setDisabledState(false);
    });
  };
  return (
    <div className="flex-grow">
      <div className="w-full max-w-[25rem] mx-auto p-6">
        <div className="flex justify-center items-center p-2 rounded-sm">
          <figure>
            <Image
              src="/images/amazon_black.png"
              width={160}
              height={160}
              alt="amazon"
              className="min-w-[100px]"
            />
          </figure>
          <p className="font-semibold text-base">.in</p>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <h4 className="font-medium text-3xl">Sign in</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {(formik) => {
              const { errors, touched, handleChange, values, handleBlur } =
                formik;
              return (
                <Form className="mt-5">
                  <div>
                    <p className="font-semibold text-sm mb-1">Email</p>
                    <Field
                      type="email"
                      name="userEmail"
                      disabled={disabledState}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userEmail}
                      className={`border ${
                        errors && errors.userEmail && touched.userEmail
                          ? "border-red-600"
                          : "border-gray-400"
                      } px-2 py-1.5 w-full rounded outline-none font-semibold text-sm disabled:cursor-not-allowed`}
                    />
                    {errors && errors.userEmail && touched.userEmail && (
                      <small className="text-red-600 font-semibold">
                        {errors.userEmail}
                      </small>
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold text-sm mb-1">Password</p>
                    <Field
                      type="password"
                      name="password"
                      disabled={disabledState}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`border ${
                        errors && errors.password && touched.password
                          ? "border-red-600"
                          : "border-gray-400"
                      } px-2 py-1.5 w-full rounded outline-none font-semibold text-sm disabled:cursor-not-allowed`}
                    />
                    {errors && errors.password && touched.password && (
                      <small className="text-red-600 font-semibold">
                        {errors.password}
                      </small>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={disabledState}
                    className="btn-add-remove mt-6 mb-3 disabled:opacity-75"
                  >
                    {disabledState ? "please wait..." : "Continue"}
                  </button>
                </Form>
              );
            }}
          </Formik>
          <p className="font-semibold text-sm mt-3">
            By continuing, you agree to Amazon&apos;s Conditions of Use and
            Privacy Notice.
          </p>
        </div>
        <div className="relative my-6 flex justify-center divider">
          <h5 className="font-semibold text-sm text-gray-500 z-[2] bg-white px-2">
            New to Amazon?
          </h5>
        </div>
        <div>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="bg-white text-gray-800 border border-gray-300 rounded-lg w-full px-3 py-2 text-sm shadow-md"
          >
            Create your Amazon account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
