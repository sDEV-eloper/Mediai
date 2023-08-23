import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  //all routes are protected using ClerkProvider on layout.tsx
  //but now, landing page is now unprotected
  publicRoutes:["/"] 
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 