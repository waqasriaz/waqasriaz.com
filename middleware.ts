import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnLogin = req.nextUrl.pathname === "/admin/login";
  const isApiRoute = req.nextUrl.pathname.startsWith("/api/admin");

  // Protect admin API routes
  if (isApiRoute && !isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Protect admin pages (except login)
  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.nextUrl));
  }

  // Redirect to admin dashboard if already logged in and on login page
  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
