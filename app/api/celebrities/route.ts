import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM celebrities");
    const celebrities = result.rows;
    client.release();

    if (!Array.isArray(celebrities)) {
      console.log(celebrities);
      return NextResponse.json(
        { error: "Invalid celebrities data" },
        { status: 400 }
      );
    }

    return NextResponse.json(celebrities);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch celebrities" },
      { status: 500 }
    );
  }
}
