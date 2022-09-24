import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";

import { AuthResp } from "../../types";
import { AppState } from "../store";

enum Status {
  pending = "pending",
  resolved = "resolved",
  idle = "idle",
  rejected = "rejected",
}

interface AuthState extends AuthResp {
  authStatus: Status;
}

const initialState: AuthState = {
  token: "",
  userId: "",
  authStatus: Status.pending,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.token = "";
      state.userId = "";
      state.authStatus = Status.idle;
    },
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.userId = payload.userId;
      state.authStatus = Status.resolved;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.userId = payload.userId;
          state.authStatus = Status.resolved;
        }
      )
      .addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.userId = payload.userId;
          state.authStatus = Status.resolved;
        }
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.token = "";
        state.userId = "";
        state.authStatus = Status.rejected;
      })
      .addMatcher(authApi.endpoints.refresh.matchRejected, (state) => {
        state.token = "";
        state.userId = "";
        state.authStatus = Status.rejected;
      });
  },
});

export { userAuthSlice };

export const { clearCredentials, setCredentials } = userAuthSlice.actions;

export const selectCurrentAuth = (state: AppState) => state.userAuth;

export { Status };
