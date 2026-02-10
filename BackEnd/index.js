import express from 'express';
import helmet from 'helmet';
import routes from './src/routes/index.js';
import mongoose from './src/db/index.js';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();

// ✅ ROOT DIRECTORY
const _dirname = path.resolve();

// -------------------- MIDDLEWARE --------------------

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"]
    }
  }
}));
app.use(cookieParser());

// ✅ CORS (simple & safe)
app.use(cors({
  origin: true,
  credentials: true
}));

// -------------------- DATABASE --------------------

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("open", () => {
  console.log(
    chalk.magentaBright.bgWhite(
      "---------- MongoDB connection successful ----------"
    )
  );
});

// -------------------- API ROUTES --------------------

app.use('/api', routes);

// -------------------- STATIC FILES --------------------

// uploads
app.use('/uploads', express.static(path.join(_dirname, "uploads")));

// frontend
app.use(express.static(path.join(_dirname, "BARKI DESIGN STUDIO WEBSITE")));

// fallback → index.html
app.get("*", (req, res) => {
  res.sendFile(
    path.join(_dirname, "BARKI DESIGN STUDIO WEBSITE", "index.html")
  );
});

// -------------------- SERVER --------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green(`🚀 Server running on port ${PORT}`));
});
