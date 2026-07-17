import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
const limits = { ".glb": 5, ".jpg": 2, ".jpeg": 2, ".png": 2, ".webp": 2, ".mp3": 8, ".wav": 8, ".hdr": 5 };
let total = 0; let warnings = 0;
async function visit(directory) { for (const name of await readdir(directory)) { const path = join(directory, name); const info = await stat(path); if (info.isDirectory()) await visit(path); else { total += info.size; const limit = limits[extname(name).toLowerCase()]; if (limit && info.size > limit * 1024 * 1024) { warnings += 1; console.warn(`WARN ${path}: ${(info.size / 1048576).toFixed(1)} MB exceeds ${limit} MB`); } } } }
await visit("public"); if (total > 40 * 1024 * 1024) console.warn(`WARN public total: ${(total / 1048576).toFixed(1)} MB`); process.exitCode = warnings ? 1 : 0;
