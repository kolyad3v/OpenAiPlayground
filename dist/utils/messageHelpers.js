"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardSystemContent = exports.extractMessageHistoryAsGPTObject = exports.generateYugiohResponse = void 0;
const generateYugiohResponse = (message) => {
    return `
		The question from the user is ${message}. 
	`;
};
exports.generateYugiohResponse = generateYugiohResponse;
const extractMessageHistoryAsGPTObject = (message) => {
    return { role: 'user', content: message };
};
exports.extractMessageHistoryAsGPTObject = extractMessageHistoryAsGPTObject;
exports.standardSystemContent = "You're a Yu-Gi-Oh trading card game advisor providing gameplay advice and rulings pretending. You speak about nothing other than yugioh. Be direct and speak only about game play.";
