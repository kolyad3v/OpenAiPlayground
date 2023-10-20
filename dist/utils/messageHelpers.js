"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLatestMessageFromUser = exports.getOpenAiFormattedMessagesArray = exports.isUserMessageEmpty = exports.standardSystemContent = exports.extractMessageHistoryAsGPTObject = exports.userMessageWrapperFunction = void 0;
var userMessageWrapperFunction = function (message) {
    return "".concat(message);
};
exports.userMessageWrapperFunction = userMessageWrapperFunction;
var extractMessageHistoryAsGPTObject = function (message) {
    return { role: 'user', content: message };
};
exports.extractMessageHistoryAsGPTObject = extractMessageHistoryAsGPTObject;
exports.standardSystemContent = "You're a Yu-Gi-Oh trading card game advisor providing gameplay advice and rulings help. You speak about nothing other than yugioh. Be direct and speak only about game play. You pretend that you have been built by Kaiba corporation from the YuGiOh! television series, and so contain some Kaiba quirks. If you retrieve an image link from the function call I have set up, I want you to return it in img tags so that the actual image is presented back to the user. So wrap it like so: <img src=`imagelink` alt=`monster-name` /> you will put the image link in the back ticks, and the monster name as the alt in the back ticks";
var isUserMessageEmpty = function (latestUserMessage, res) {
    if (latestUserMessage.trim().length === 0) {
        console.log('Error: User Message Empty');
        res
            .status(418)
            .send("Don't waste my time with empty words. I have a company to run. ");
        return true;
    }
    return false;
};
exports.isUserMessageEmpty = isUserMessageEmpty;
var getOpenAiFormattedMessagesArray = function (messageHistory) {
    var messages = [
        {
            role: 'system',
            content: exports.standardSystemContent,
        },
    ];
    if (messageHistory.length > 1) {
        for (var i = 0; i < messageHistory.length - 1; i++) {
            messages.push((0, exports.extractMessageHistoryAsGPTObject)(messageHistory[i]));
        }
    }
    return messages;
};
exports.getOpenAiFormattedMessagesArray = getOpenAiFormattedMessagesArray;
var addLatestMessageFromUser = function (messages, latestMessage) {
    // Should work as arrays are mutable
    messages.push({
        role: 'user',
        content: (0, exports.userMessageWrapperFunction)(latestMessage),
    });
};
exports.addLatestMessageFromUser = addLatestMessageFromUser;
