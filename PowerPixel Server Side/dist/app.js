"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./app/config/env");
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const app = (0, express_1.default)();
// ---------- core middlewares ----------
app.use(express_1.default.json()); // parse JSON
app.use((0, cookie_parser_1.default)()); // parse cookies
// ---------- CORS ----------
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL || "", // production frontend
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true, // needed for cookies or sessions
}));
// ---------- OPTIONAL session ----------
if (env_1.envVars.ENABLE_SESSION === "true") {
    app.use((0, express_session_1.default)({
        secret: env_1.envVars.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true, // cannot access cookie via JS
            secure: process.env.NODE_ENV === "production", // only HTTPS
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    }));
}
app.use("/api/v1", routes_1.router);
// ---------- test route ----------
app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Welcome to Power Pixel Backend",
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
