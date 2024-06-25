import { authMiddleware } from "@clerk/nextjs";
import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";
// import { Ratelimit } from "@upstash/ratelimit";
// import { kv } from "@vercel/kv";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/css",
    "/mui",
    "/tailwind",
    "/color",
    "/components(.*)",
    "/uielements(.*)",
    "/pricing",
    "/checkout",
    "/blogs(.*)",
    "/api(.*)",
    "/aiprojects(.*)",
  ],
});

// const ratelimit = new Ratelimit({
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   redis: kv,
//   // 5 requests from the same IP in 10 seconds
//   limiter: Ratelimit.slidingWindow(20, "2 s"),
// });

export function middleware(request: NextRequest) {
  // You could alternatively limit based on user ID or similar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const USER_AGENT_DATA: any = userAgent(request);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-unsafe-call
  if (!USER_AGENT_DATA || (USER_AGENT_DATA?.ua as any)?.includes("python")) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  // const ip = request.ip ?? "127.0.0.1";
  // const { success } = await ratelimit.limit(ip);
  // if (success) {
  // if (request.url.endsWith("components")) {
  //   return NextResponse.redirect(new URL("/components/mui/All", request.url));
  // }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
//   return NextResponse.redirect(new URL("/blocked", request.url));
// }

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
