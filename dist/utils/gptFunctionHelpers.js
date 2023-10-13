"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupCard = void 0;
const fs_1 = __importDefault(require("fs"));
function lookupCard(cardName) {
    const rawData = fs_1.default.readFileSync('cards.json', 'utf-8');
    const cards = JSON.parse(rawData);
    const regexPattern = cardName.split(/\s+/).join('[-\\s]*');
    const regex = new RegExp(regexPattern, 'i');
    console.log(`function called with ${cardName}`);
    for (let card of cards) {
        if (regex.test(card.name)) {
            return JSON.stringify(card);
        }
    }
    return 'false'; // Return null if the card is not found
}
exports.lookupCard = lookupCard;
