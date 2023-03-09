import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const strapiRes = await fetch(
      `http://localhost:1337/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    );
    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // set the Cookie
      const cook = {
        jwt: data.jwt,
        id: data.user.id,
      };
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", JSON.stringify(cook), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 Week
          sameSite: "strict",
          path: "/",
        }),
      );

      res.status(200).json({ data: data.user });
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method}` });
  }
};
