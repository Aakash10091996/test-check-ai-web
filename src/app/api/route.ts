import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    return NextResponse.json({ message: "next server running" });
  } catch (error) {
    console.error("Error rendering component:", error);
    res.status(500).json({ error: "Error rendering component" });
  }
}
