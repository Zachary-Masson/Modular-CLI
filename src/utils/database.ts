import { Database } from "@types";
import fs from "node:fs";
import path from "node:path";

let database: Database;
const databasePath = path.join(__dirname, "..", "database.json");

export function InitDatabase() {
  database = {
    last_author: "",
  };

  return fs.existsSync(databasePath)
    ? null
    : fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
}

export async function getDatabase() {
  database = JSON.parse(fs.readFileSync(databasePath, { encoding: "utf-8" }));
  return;
}

export async function save() {
  return fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
}

export function getLastAuthor() {
  return database.last_author;
}

// Setters
export async function setLastAuthor(author: string) {
  database.last_author = author;
  await save();
}
