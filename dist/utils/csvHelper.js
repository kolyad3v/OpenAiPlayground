"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendToCsv = void 0;
const fs_1 = __importDefault(require("fs"));
const appendToCsv = (question, answer) => {
    // Escape quotes and wrap each field in quotes
    const formattedQuestion = `"${question.replace(/"/g, '""')}"`;
    const formattedAnswer = `"${answer.replace(/"/g, '""')}"`;
    // Combine question and answer into a single CSV line
    const csvString = `${formattedQuestion},${formattedAnswer}\n`;
    fs_1.default.appendFileSync('responses.csv', csvString);
};
exports.appendToCsv = appendToCsv;
