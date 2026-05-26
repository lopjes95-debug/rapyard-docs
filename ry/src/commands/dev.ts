import { execSync } from "child_process";

export function dev(target: string) {
  if (!target) {
    console.log("Usage: ry dev <web|api|worker|mobile>");
    return;
  }

  console.log("Starting dev for:", target);
  execSync(`pnpm dev:${target}`, { stdio: "inherit" });
}
