import fs from "node:fs";
import path from "node:path";
import { flattenedRscAliasPath } from "../src/lib/rsc-export";

const outDir = path.join(process.cwd(), "out");
if (!fs.existsSync(outDir)) throw new Error("out/ is missing; run next build first");

let aliases = 0;
function visit(directory: string) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(file);
      continue;
    }
    if (!entry.isFile()) continue;
    const alias = flattenedRscAliasPath(outDir, file);
    if (!alias) continue;
    fs.copyFileSync(file, alias);
    aliases += 1;
  }
}
visit(outDir);
console.log(`Static RSC compatibility files: ${aliases}`);
