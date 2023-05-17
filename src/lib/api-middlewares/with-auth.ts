import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "../prisma";
import { User } from "@prisma/client";
import { AuthorizedUser } from "../../types/api";
import cookie from "cookie";

export async function withAuth(req: {
  headers: {
    cookie: string | null;
    authorization: string | null;
  };
}): Promise<AuthorizedUser> {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie);

      token = cookies.access_token;
    }

    if (!token) {
      return {
        user: null,
        error: "You are not logged in",
      };
    }

    const JWT_SECRET = process.env.JWT_SECRET as unknown as string;

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return {
        user: null,
        error: "Invalid token or user doesn't exist",
      };
    }

    const user = await db.user.findUnique({
      where: { user_id: 1 },
    });

    if (!user) {
      return {
        user: null,
        error: "User with that token no longer exist",
      };
    }

    return {
      user,
      error: null,
    };
  } catch (err: any) {
    return {
      user: null,
      error: "something went wrong",
    };
  }
}

export async function getServerSession() {
  console.log("it does something");
  return async function (
    req: NextApiRequest | NextRequest,
    res: NextApiResponse | NextResponse
  ) {
    console.log("it does something", req.cookies, req.method, res.status);
  };
}
