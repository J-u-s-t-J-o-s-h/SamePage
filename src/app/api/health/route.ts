import { NextResponse } from "next/server";
import { buildHealthCheck } from "@/lib/health";

export const dynamic = "force-dynamic";

export function GET() {
  const body = buildHealthCheck({
    version: process.env.npm_package_version ?? "0.1.0",
  });

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
