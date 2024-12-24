import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import pool from "@/lib/db";

export async function GET(request: Request) {
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
