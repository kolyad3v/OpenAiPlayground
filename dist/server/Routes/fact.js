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
const express_1 = require("express");
const openai_1 = __importDefault(require("openai"));
const router = (0, express_1.Router)();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const completion = yield openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You will give me a random interesting fact,chosen from either animals,culture or history keep to 20 words or less',
            },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        max_tokens: 50,
    });
    console.log(completion);
    res.json({ message: `${completion.choices[0].message.content}` });
}));
module.exports = router;
