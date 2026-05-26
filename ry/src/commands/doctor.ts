import fs from "fs";

export function doctor() {
  console.log("🔍 RapYard Doctor — Checking monorepo health...");

  const required = [
    "apps/web",
    "apps/api",
    "apps/worker",
    "apps/mobile",
    "packages/ui",
    "packages/utils",
    "packages/schema",
    "packages/env",
    "packages/supabase",
    "ry"
  ];

  for (const path of required) {
    if (fs.existsSync(path)) {
      console.log("✔", path);
    } else {
      console.log("✖ MISSING:", path);
    }
  }

  console.log("Done.");
}
