import { auth } from "@/lib/auth";

export default auth((req) => {
  // const isLogged = !!req.auth;
  // if (!isLogged) {
  //   return Response.redirect(new URL("/auth/login", req.nextUrl));
  // }
  // return Response.json(req.auth);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
