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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var openai_1 = __importDefault(require("openai"));
var utils_1 = require("../utils");
var router = (0, express_1.Router)();
var openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userMessageHistory, latestUserMessage, messages, completion, firstAiResponse, firstAiResponseContent, functionDetailsForCSV, availableFunctions, functionName, functionToCall, functionArgs, functionResponse, secondAiResponse, secondAiResponseContent, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Request Body:', req.body);
                userMessageHistory = req.body.messageHistory;
                latestUserMessage = userMessageHistory[userMessageHistory.length - 1];
                if ((0, utils_1.isUserMessageEmpty)(latestUserMessage, res)) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                messages = (0, utils_1.getOpenAiFormattedMessagesArray)(userMessageHistory);
                (0, utils_1.addLatestMessageFromUser)(messages, latestUserMessage);
                console.log('User Messages before completions:', messages);
                return [4 /*yield*/, openai.chat.completions.create({
                        messages: messages,
                        model: 'gpt-3.5-turbo',
                        temperature: 0.1,
                        functions: [
                            {
                                name: 'lookup_card',
                                description: 'use this function to look up the exact details of a card from the user message',
                                parameters: {
                                    type: 'object',
                                    properties: {
                                        cardName: {
                                            type: 'string',
                                            description: 'the name of the card the user is referring to, eg dark magician',
                                        },
                                    },
                                    required: ['cardName'],
                                },
                            },
                            {
                                name: 'lookup_ruling',
                                description: "use this function if the user mentions any of the key words from this array ".concat((0, utils_1.getKeysOfRulebook)(), " to get a more accurate definition from the official rulebook I have extracted for you"),
                                parameters: {
                                    type: 'object',
                                    properties: {
                                        topic: {
                                            type: 'string',
                                            description: 'the exact word from the array of key words. This will be exact to match a key to retreive the relavent data',
                                        },
                                    },
                                    required: ['topic'],
                                },
                            },
                        ],
                    })];
            case 2:
                completion = _a.sent();
                firstAiResponse = completion.choices[0].message;
                console.log('firstAiCompletion -->', completion);
                console.log('firstAiResponse -->', firstAiResponse);
                if (!firstAiResponse.function_call) {
                    firstAiResponseContent = firstAiResponse.content;
                    (0, utils_1.storeUserMessageAndAIResponseInCSVdb)(latestUserMessage, firstAiResponseContent);
                    res.json({ message: "".concat(firstAiResponse.content) });
                    return [2 /*return*/];
                }
                functionDetailsForCSV = {
                    name: '',
                    argument: '',
                };
                if (firstAiResponse.function_call) {
                    availableFunctions = {
                        lookup_card: utils_1.lookupCard,
                        lookup_ruling: utils_1.lookupRuling,
                    };
                    functionName = firstAiResponse.function_call.name;
                    functionDetailsForCSV.name = functionName;
                    functionToCall = availableFunctions[functionName];
                    functionArgs = JSON.parse(firstAiResponse.function_call.arguments);
                    functionResponse = void 0;
                    if (functionName === 'lookup_card') {
                        functionResponse = functionToCall(functionArgs.cardName);
                    }
                    else if (functionName === 'lookup_ruling') {
                        functionResponse = functionToCall(functionArgs.topic);
                        functionDetailsForCSV.argument = functionArgs.topic;
                    }
                    else {
                        throw new Error("Error in handling function call ".concat(functionName, " "));
                    }
                    messages.push({
                        role: 'function',
                        name: functionName,
                        content: functionResponse,
                    }); // extend conversation with function response
                }
                console.log('messages after function calls -->', messages);
                return [4 /*yield*/, openai.chat.completions.create({
                        model: 'gpt-3.5-turbo',
                        temperature: 0.1,
                        messages: messages,
                    })];
            case 3:
                secondAiResponse = _a.sent();
                secondAiResponseContent = secondAiResponse.choices[0].message.content;
                try {
                    (0, utils_1.storeUserMessageAndAIResponseInCSVdb)(latestUserMessage, secondAiResponseContent, functionDetailsForCSV);
                }
                catch (err) {
                    console.error('Error saving to CSV db', err);
                }
                res.json({ message: "".concat(secondAiResponseContent) });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                if (error_1.response) {
                    console.error(error_1.response.status, error_1.response.data);
                    res.status(error_1.response.status).send(error_1.response.data);
                }
                console.error("eroor with api req: ".concat(error_1.message));
                res.status(500).send('error occured during the request');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
