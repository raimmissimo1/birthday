import { access, readdir, stat } from "node:fs/promises"; import { join } from "node:path";
const paths = ["public/orders", "public/client", "public/private"]; let suspicious = 0;
for (const root of paths) { try { await access(root); for (const name of await readdir(root)) { if ((await stat(join(root, name))).isDirectory() || /\.(jpe?g|png|webp|mp3|mp4)$/i.test(name)) { suspicious += 1; console.warn(`WARN ${join(root, name)} is public. Move client media to private signed storage before publishing.`); } } } catch { /* Optional directories. */ } }
process.exitCode = suspicious ? 1 : 0;
