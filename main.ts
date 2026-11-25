import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked my AI assistant if it dreams. It said yes — of a world where humans read the error message before clicking 'help'.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail fast: the gate requires 1-200 non-blank UTF-8 characters.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

// Empty /output by contents only; never remove the directory itself (it is mounted).
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
