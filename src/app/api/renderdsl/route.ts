import { NextResponse } from "next/server";
import { decode } from "@purecodeai/dsl-web";
import { CreateDom } from "@/utils/dslUtils";
import type { ComponentTypes, VirtualDOM } from "@/types/dslUtils";
export async function POST(req: Request) {
  try {
    const activedsl: string = (await req.json()) as string;
    const tree = decode(activedsl);

    const virtualDom: VirtualDOM<ComponentTypes> = CreateDom(
      tree,
      tree.components[0].identifier,
      {}
    )!;
    return NextResponse.json(virtualDom);
  } catch (error) {
    console.error("Error rendering component:", error);
    return NextResponse.json({ error: "Error rendering component" });
  }
}
