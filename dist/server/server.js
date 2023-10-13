"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
var cors = require('cors');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(cors(), express_1.default.json());
app.use('/api/fact', require('./Routes/fact'));
app.use('/api/kaibaChat', require('./Routes/kaibaChat'));
// serve static assets in production
app.use(express_1.default.static('client/dist'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'client', 'dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
