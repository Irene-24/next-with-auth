// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import axios from "axios";

import { API_URL } from "../../utils";
import { AuthResp } from "../../types";

type Body = Pick<AuthResp, "userId">;

type Data = Record<string, any>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const credentials: Body = req.body;

    const cookies = new Cookies(req, res);

    cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0, // expire it
      path: "/",
      sameSite: "lax",
    });

    cookies.set("currentJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    });

    cookies.set("expiresAt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    });

    try {
      if (credentials.userId) {
        const url = `${API_URL}/Authentication/RevokeUserRefreshToken?userId=${credentials.userId}`;
        await axios.post(url);

        res.status(200).json({ message: "Logged out." });
      } else {
        res.status(400).json({ message: "Could not revoke access" });
      }
    } catch (error: any) {
      res.status(error?.response?.data?.status ?? 500).json({
        message: "Unable to refresh",
        error: error?.response?.data?.errors ?? error,
      });
    }
  } else {
    res
      .status(405)
      .json({ message: "Invalid request method.Only POST allowed" });
  }
}
