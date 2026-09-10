import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import routes from "./routes";
import errorHandler from "./middlewares/error.middleware";

const app = express();
const publicDir = path.join(__dirname, "../public");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Logged-In"],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

// API routes
app.use("/api", routes);

// Static UI (giống genLaSo)
app.use("/static", express.static(path.join(publicDir, "static")));
app.use(express.static(publicDir));

// Login first (giống genLaSo)
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/bazi", (_req, res) => {
  res.sendFile(path.join(publicDir, "bazi.html"));
});

// Alias giống genLaSo /test
app.get("/test", (_req, res) => {
  res.sendFile(path.join(publicDir, "bazi.html"));
});

app.get("/horoscope", (_req, res) => {
  res.sendFile(path.join(publicDir, "horoscope.html"));
});

// Global Error Handling Middleware
app.use(errorHandler);

export default app;
