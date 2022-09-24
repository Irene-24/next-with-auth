// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Cookies from "cookies";

import { LoginBody } from "../../types";
import { API_URL, encode } from "../../utils";

type Data = Record<string, any>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const credentials: LoginBody = req.body;

    if (credentials.password && credentials.userName) {
      try {
        const url = `${API_URL}/Authentication/LoginWithPassword`;

        const response = await axios.post(url, credentials);

        const cookies = new Cookies(req, res);

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
        res
          .status(error?.response?.status ?? 500)
          .json({ message: "Unable to login", error });
      }
    } else {
      res.status(400).json({ message: "Missing parameters username/password" });
    }
  } else {
    res
      .status(405)
      .json({ message: "Invalid request method.Only POST allowed" });
  }
}
