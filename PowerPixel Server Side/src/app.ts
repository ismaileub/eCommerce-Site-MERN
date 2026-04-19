import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import cors from "cors";
import { envVars } from "./app/config/env";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

const app = express();

// ---------- core middlewares ----------
app.use(express.json()); // parse JSON
app.use(cookieParser()); // parse cookies

// ---------- CORS ----------
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL || "", // production frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // needed for cookies or sessions
  }),
);

// ---------- OPTIONAL session ----------
if (envVars.ENABLE_SESSION === "true") {
  app.use(
    expressSession({
      secret: envVars.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // cannot access cookie via JS
        secure: process.env.NODE_ENV === "production", // only HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );
}

app.use("/api/v1", router);

// ---------- test route ----------
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Power Pixel Backend",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
