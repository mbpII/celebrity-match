import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), "data", "celebrities.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const celebrities = JSON.parse(fileContents);
    if (!Array.isArray(celebrities)) {
      console.log(celebrities);
      return NextResponse.json(
        { error: "Invalid celebrities data" },
        { status: 400 }
      );
    }
    return NextResponse.json(celebrities);
  } catch (error) {
    console.error("Error fetching celebrities", error);
    return NextResponse.json(
      { error: "Failed to fetch celebrities" },
      { status: 500 }
    );
  }
}
