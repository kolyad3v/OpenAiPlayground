"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const plugin_basic_ssl_1 = __importDefault(require("@vitejs/plugin-basic-ssl"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)(), (0, plugin_basic_ssl_1.default)()],
    server: {
        host: true,
        proxy: {
            '/api': 'http://localhost:3000',
        },
        cors: false,
        https: true,
    },
});