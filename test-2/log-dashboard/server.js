import http from "http";
import fs from "fs";
import path from "path";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 调整日志目录路径，根据实际结构
const LOG_DIR = path.resolve(__dirname, "../NapCatQQ/napcat/logs");
const PORT = 4000;

console.log(`Log Directory: ${LOG_DIR}`);

const server = http.createServer((req, res) => {
  // 允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public/index.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
  } else if (req.url === "/api/files") {
    if (!fs.existsSync(LOG_DIR)) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([]));
      return;
    }

    fs.readdir(LOG_DIR, (err, files) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Cannot read log dir" }));
        return;
      }
      // 只看 .log 文件
      const logFiles = files.filter((f) => f.endsWith(".log"));

      // 按时间倒序排序
      const fileStats = logFiles
        .map((f) => {
          try {
            const stats = fs.statSync(path.join(LOG_DIR, f));
            return { name: f, time: stats.mtimeMs, size: stats.size };
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => b.time - a.time);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(fileStats));
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  let watcher = null;
  let currentFilePath = null;

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "watch") {
        const filename = data.filename;
        const filePath = path.join(LOG_DIR, filename);

        // 安全检查
        if (!filePath.startsWith(LOG_DIR)) return;

        if (watcher) {
          watcher.close();
          watcher = null;
        }

        currentFilePath = filePath;
        console.log(`Watching file: ${filename}`);

        // 发送完整内容
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf8");
          ws.send(JSON.stringify({ type: "content", content }));
        }

        // 监听变化
        try {
          watcher = fs.watch(filePath, (eventType) => {
            if (eventType === "change") {
              // 简单起见，重新读取整个文件
              // 生产环境应该只读取新增部分，但对于本地调试工具，全量读取足够
              fs.readFile(filePath, "utf8", (err, newContent) => {
                if (!err) {
                  ws.send(
                    JSON.stringify({ type: "update", content: newContent }),
                  );
                }
              });
            }
          });
        } catch (e) {
          console.error("Watch error:", e);
        }
      }
    } catch (e) {
      console.error("Message error:", e);
    }
  });

  ws.on("close", () => {
    if (watcher) watcher.close();
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`Dashboard running at http://localhost:${port}`);
    console.log(`Open your browser to view logs.`);
  });

  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", e);
    }
  });
}

startServer(PORT);
