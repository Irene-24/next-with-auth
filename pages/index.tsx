import type { NextPage } from "next";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "../redux/services/auth";
import { AuthResp } from "../types";

const Login: NextPage = () => {
  const [body, setBody] = useState({
    userName: "",
    password: "",
  });

  const [login] = useLoginMutation();

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(body).unwrap();

      const path = (router.query?.callbackUrl as string) || "/admin";
      router.push(path);
    } catch (error) {
      //else handle error

      console.log(error);
    }
  };

  const handleChange =
    (field: "userName" | "password") => (e: ChangeEvent<HTMLInputElement>) => {
      setBody((body) => ({
        ...body,
        [field]: e.target.value,
      }));
    };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mode-week-grid">
      <div className="max-w-md w-full space-y-8">
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold">
            Login
          </h1>

          <div className="space-y-4 rounded-md">
            <div className="relative pb-5">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-app-purple-4 focus:border-app-purple-4 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange("userName")}
              />
            </div>

            <div className="relative pb-5">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                className="relative block w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-app-purple-4 focus:border-app-purple-4 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange("password")}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="relative min-w-[150px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-app-purple-4"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
