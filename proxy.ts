import { NextResponse, type NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
