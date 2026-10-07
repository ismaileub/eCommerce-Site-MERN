"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const seedSuperAdmin_1 = require("./app/utils/seedSuperAdmin");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("✅ Connected to MongoDB");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`🚀 Server listening on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
});
const gracefulShutdown = (signal_1, ...args_1) => __awaiter(void 0, [signal_1, ...args_1], void 0, function* (signal, exitCode = 0) {
    console.log(`⚠️ ${signal} received... Shutting down server`);
    if (server) {
        server.close(() => __awaiter(void 0, void 0, void 0, function* () {
            yield mongoose_1.default.connection.close();
            console.log("✅ MongoDB connection closed");
            process.exit(exitCode);
        }));
    }
    else {
        process.exit(exitCode);
    }
});
// Start server and seed super admin
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    try {
        yield (0, seedSuperAdmin_1.seedSuperAdmin)();
    }
    catch (err) {
        console.error("❌ Seeding failed:", err);
    }
}))();
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
