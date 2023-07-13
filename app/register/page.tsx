"use client";
import authService from "@/core/service/auth.service";
import { registerValidationSchema } from "@/core/validations/auth.validation";
import { Form, Formik, Field } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface IRegisterValues {
  userName: string;
  userEmail: string;
  password: string;
}

function Register() {
  const router = useRouter();
  const [disabledState, setDisabledState] = useState<boolean>(false);

  const initialValues: IRegisterValues = {
    userName: "",
    userEmail: "",
    password: "",
  };

  const handleRegister = (values: IRegisterValues) => {
    setDisabledState(true);
    authService
      .register(values)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          router.push("/login");
        } else {
          toast.error(res.data.message);
          setDisabledState(false);
        }
      })
      .catch(() => {
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
          <h4 className="font-medium text-3xl">Create Account</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={(values) => handleRegister(values)}
          >
            {(formik) => {
              const { errors, touched } = formik;
              return (
                <Form className="mt-5">
                  <div>
                    <p className="font-semibold text-sm mb-1">Your Name</p>
                    <Field
                      type="text"
                      name="userName"
                      disabled={disabledState}
                      className={`border ${
                        errors && errors.userName && touched
                          ? "border-red-600"
                          : "border-gray-400"
                      } px-2 py-1.5 w-full rounded outline-none font-semibold text-sm disabled:cursor-not-allowed`}
                    />
                    {errors && errors.userName && touched.userName && (
                      <small className="text-red-600 font-semibold">
                        {errors.userName}
                      </small>
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold text-sm mb-1">email</p>
                    <Field
                      type="text"
                      name="userEmail"
                      disabled={disabledState}
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
                  <div className="space-y-3 mt-4">
                    <div className="font-semibold text-sm flex items-center space-x-2">
                      <p>Already have an account?</p>
                      <Link href="/login" className="text-blue-600">
                        Sign in
                      </Link>
                    </div>
                    <p className="font-semibold text-sm">
                      By creating an account or logging in, you agree to
                      Amazon’s Conditions of Use and Privacy Policy.
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
