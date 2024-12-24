import { promises as fs } from "fs";
import path from "path";
import pool from "@/lib/db";

// const celebrities = [
//   // PASTA celebrities HERE
//   // OR
const jsonData = await fs.readFile(
  path.join(process.cwd(), "data", "celebrities.json"),
  "utf8"
);
const celebrities = JSON.parse(jsonData);
// ];

async function importCelebrities() {
  try {
    const client = await pool.connect();
    console.log(`Starting import of ${celebrities.length} celebrities...`);

    for (const celebrity of celebrities) {
      await client.query(
        "INSERT INTO celebrities (name, description, image_url) VALUES ($1, $2, $3)",
        [celebrity.name, celebrity.description, celebrity.image_url]
      );
      console.log(`Imported ${celebrity.name}`);
    }
    client.release();
    console.log("Import completed successfully");
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await pool.end();
  }
}

importCelebrities();
