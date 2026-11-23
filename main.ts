// Entry program for the make.fun post-x bounty (Node 22, standard library only).
//
// The entry itself is the X post: a short video about an AI coding agent
// building a tiny browser game from one prompt, ending on make.fun's referral
// end card. This program does the one thing the gate needs — it carries the
// post's address from the repository into the grader's output directory.
//
// POST.json at the repository root names the post:
//   {"url": "https://x.com/<handle>/status/<id>"}
// The house reads the post from X itself; nothing written here is scored.
//
// Locally, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and
// /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import * as fs from 'node:fs';
import * as path from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = path.join(botDir, 'POST.json');
const target = path.join(outDir, 'POST.json');

fs.mkdirSync(outDir, { recursive: true });

let post;
try {
  post = fs.readFileSync(source, 'utf8');
} catch (err) {
  console.error(`cannot read ${source}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  JSON.parse(post);
} catch {
  console.error(`POST.json is not valid JSON: ${source}`);
  process.exit(1);
}

try {
  fs.writeFileSync(target, post);
} catch (err) {
  console.error(`cannot write ${target}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`POST.json -> ${target}`);
