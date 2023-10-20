"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeUserMessageAndAIResponseInCSVdb = void 0;
var fs_1 = __importDefault(require("fs"));
var storeUserMessageAndAIResponseInCSVdb = function (userMessage, AIresponse, aiHelperFunction) {
    // Wrap it in quotes to handle commas in the message
    var prepUserMessageForCSV = "\"".concat(userMessage, "\"\n");
    var prepAIMessageForCSV = "\"".concat(AIresponse, "\"\n");
    // Escape quotes and wrap each field in quotes
    var formattedUserMessageForCSV = "\"".concat(prepUserMessageForCSV.replace(/"/g, '""'), "\"");
    var formattedAIMessageForCSV = "\"".concat(prepAIMessageForCSV.replace(/"/g, '""'), "\"");
    var CSV_ENTRY = "".concat(formattedUserMessageForCSV, ",").concat(formattedAIMessageForCSV, "\n");
    if (aiHelperFunction) {
        CSV_ENTRY = "".concat(formattedUserMessageForCSV, ",").concat(formattedAIMessageForCSV, ", ").concat(aiHelperFunction.name, ", ").concat(aiHelperFunction.argument, "\n");
    }
    // Combine question and answer into a single CSV line
    try {
        fs_1.default.appendFileSync('responses.csv', CSV_ENTRY);
    }
    catch (error) {
        console.error('Error saving to CSV db', error);
        throw error;
    }
};
exports.storeUserMessageAndAIResponseInCSVdb = storeUserMessageAndAIResponseInCSVdb;
