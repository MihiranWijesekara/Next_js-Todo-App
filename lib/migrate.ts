import { db } from "./db";

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('user','manager','admin')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS todo (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('draft','in-progress','completed')) NOT NULL,
    user_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
  `
).run();

console.log("✅ Tables created");
