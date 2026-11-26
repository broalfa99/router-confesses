// The Router Confesses — make.fun bounty entry.
// main.ts writes a single one-line excuse from a home Wi-Fi router
// (at most 200 characters) to /output/entry.txt.
//
// The line: the router watched the movie too, saw the killer's face
// before anyone else, panicked, and dropped the connection — then
// claims credit for it. A smug little secret, not a buffering joke:
// "I saw the killer's face first. Then I panicked and dropped you.
// You're welcome."

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I saw the killer's face first. Then I panicked and dropped you. You're welcome.";

// Gate: the entry must be 1-200 characters of non-whitespace text, one line.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`Line is ${LINE.length} characters; must be 1-200.`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line.");
}
if (LINE !== LINE.trim()) {
  throw new Error("Line must not start or end with whitespace.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the write: read the file back and confirm it holds exactly
// the line above, so a truncated or failed write fails loudly here
// instead of shipping a wrong entry to the judge.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line after writing.");
}
console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
