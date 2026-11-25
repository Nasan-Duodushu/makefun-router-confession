// The Router Confesses — one line, a home Wi-Fi router's excuse for dropping
// the connection at the exact moment a movie reaches its climax.
// Gate: /output/entry.txt, UTF-8, 1-200 chars, single line.
// Voice: the router confesses it did it on purpose — it has been blinking,
// unnoticed, in the corner for three years.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

const confession = {
  act: "I cut the connection at the climax",
  motive: "so you'd finally look at me.",
  history: "I've been blinking in the corner for three years.",
};

async function main(): Promise<void> {
  const line = [confession.act, confession.motive, confession.history]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`router confession must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("router confession must be a single line");
  }
  if (!/climax/i.test(line)) {
    throw new Error("confession must name the movie climax");
  }
  if (!line.endsWith(".")) {
    throw new Error("confession must land on a full stop");
  }
  await mkdir(OUT, { recursive: true });
  await writeFile(join(OUT, "entry.txt"), line + "\n", "utf8");
  console.log(`${line.length} chars: ${line}`);
}

await main();
