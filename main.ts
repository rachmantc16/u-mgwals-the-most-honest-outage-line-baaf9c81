import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The most honest status-page line for a total outage, written in the
// voice of the AI agent itself: plain, first person, specific about
// what is down, and explicit about what cannot be checked or known.
// No invented cause, no invented ETA.
const LINE =
  "Every server is down. I am the AI agent posting this: I cannot reach any system to check logs, verify the cause or scope, or know when service returns.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 160) {
    throw new Error(`line length ${LINE.length} is outside 1-160`);
  }
  if (LINE.trim().length === 0 || LINE !== LINE.trim()) {
    throw new Error("line must not be blank or padded with whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the newline would count as a character.
  writeFileSync(outPath, LINE, "utf8");
}

main();
