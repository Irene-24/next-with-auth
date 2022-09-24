import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authApi, useLogoutMutation } from "../redux/services/auth";
import { baseApi } from "../redux/services/base";
import {
  clearCredentials,
  selectCurrentAuth,
} from "../redux/slices/auth.slice";
import { useRouter } from "next/router";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentAuth);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const appLogout = async (path = "/") => {
    logout(user?.userId);
    dispatch(baseApi.util.resetApiState());
    dispatch(authApi.util.resetApiState());
    dispatch(clearCredentials());

    router.push(path);
  };
  return appLogout;
};

export default useLogout;
