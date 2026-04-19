import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const baseDir = normalize(fileURLToPath(new URL(".", import.meta.url)));
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

function resolvePath(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") {
    pathname = "/index.html";
  } else if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }

  const filePath = normalize(join(baseDir, pathname));

  if (!filePath.startsWith(baseDir)) {
    return null;
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }

  return null;
}

createServer((request, response) => {
  const filePath = resolvePath(request.url || "/");

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
  });

  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`E D Industrial site running at http://localhost:${port}`);
});
