import { configureStore, ThunkAction, Middleware } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { screensApi } from "./services/screens";
import { authApi } from "./services/auth";
import { userAuthSlice } from "./slices/auth.slice";
import { baseApi } from "./services/base";

const middlewares: Middleware[] = [
  baseApi.middleware,
  screensApi.middleware,
  authApi.middleware,
];

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [screensApi.reducerPath]: screensApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userAuthSlice.name]: userAuthSlice.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
