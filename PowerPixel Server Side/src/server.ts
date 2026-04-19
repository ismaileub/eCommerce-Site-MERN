/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("✅ Connected to MongoDB");

    server = app.listen(envVars.PORT, () => {
      console.log(`🚀 Server listening on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal: string, exitCode = 0) => {
  console.log(`⚠️ ${signal} received... Shutting down server`);
  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed");
      process.exit(exitCode);
    });
  } else {
    process.exit(exitCode);
  }
};

// Start server and seed super admin
(async () => {
  await startServer();
  try {
    await seedSuperAdmin();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
})();

// Signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", 0));
process.on("SIGINT", () => gracefulShutdown("SIGINT", 0));

// Unhandled errors
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  gracefulShutdown("unhandledRejection", 1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  gracefulShutdown("uncaughtException", 1);
});

// Unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local error")

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
