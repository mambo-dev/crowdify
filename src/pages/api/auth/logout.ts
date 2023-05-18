import type { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //send cookie with jwt
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access_token", "", {
      maxAge: -1,
      path: "/",
    })
  );

  return res.status(200).json({
    success: true,
  });
}
