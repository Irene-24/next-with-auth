import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Cookies from "cookies";

import { RefreshBody } from "../../types";
import { API_URL, decode, encode } from "../../utils";

type Data = Record<string, any>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" || req.method === "GET") {
    const credentials: RefreshBody = req.body;

    const cookies = new Cookies(req, res);

    const refreshCookie = cookies.get("refreshToken");
    const tokenCookie = cookies.get("currentJWT");

    let refresh = "";
    let currentJWT = "";
    let token = "";

    if (refreshCookie && tokenCookie) {
      refresh = decode(cookies.get("refreshToken") as string);
      token = decode(cookies.get("currentJWT") as string);

      currentJWT = credentials?.currentJWT ?? token;
    } else {
      return res.status(400).json({ message: "Missing parameters" });
    }

    if (refresh && currentJWT) {
      try {
        const url = `${API_URL}/Authentication/GenerateRefreshToken`;

        const response = await axios.post(url, {
          currentJWT,
          refreshToken: refresh,
        });

        cookies.set("refreshToken", encode(response.data.refreshToken), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          path: "/",
          sameSite: "lax",
        });

        cookies.set("currentJWT", encode(response.data.token), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 1000 * 60 * 60 * 2, // 2hrs
          path: "/",
          sameSite: "lax",
        });

        cookies.set("expiresAt", response.data.expiresAt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(response.data.expiresAt),
          path: "/",
          sameSite: "lax",
        });

        const respBody = {
          userId: response.data.userId,
          token: response.data.token,
        };

        res.status(200).json(respBody);
      } catch (error: any) {
        res.status(error?.response?.data?.status ?? 500).json({
          message: "Unable to refresh",
          error: error?.response?.data?.errors ?? error,
        });
      }
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } else {
    res
      .status(405)
      .json({ message: "Invalid request method.Only POST,GET allowed" });
  }
}
