"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors = require('cors');
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
app.use(cors(), express_1.default.json());
app.use('/api/kaibaChat', require('./routes/kaibaChat'));
// serve static assets in production
app.use(express_1.default.static('client/dist'));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, '../client', 'dist', 'index.html'));
});
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
