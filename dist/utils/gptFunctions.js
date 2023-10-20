"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicsOfRulebook = exports.lookupRuling = exports.getKeysOfRulebook = exports.lookupCard = void 0;
var fs_1 = __importDefault(require("fs"));
function lookupCard(cardName) {
    var rawData = fs_1.default.readFileSync('cards.json', 'utf-8');
    var cards = JSON.parse(rawData);
    var regexPattern = cardName.split(/\s+/).join('[-\\s]*');
    var regex = new RegExp(regexPattern, 'i');
    console.log("function called with ".concat(cardName));
    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
        var card = cards_1[_i];
        if (regex.test(card.name)) {
            return JSON.stringify(card);
        }
    }
    return 'false'; // Return null if the card is not found
}
exports.lookupCard = lookupCard;
function getKeysOfRulebook() {
    var rawData = fs_1.default.readFileSync('rulebook.json', 'utf-8');
    var rulebook = JSON.parse(rawData);
    return Object.keys(rulebook);
}
exports.getKeysOfRulebook = getKeysOfRulebook;
var lookupRuling = function (topic) {
    var rawData = fs_1.default.readFileSync('rulebook.json', 'utf-8');
    var rulebook = JSON.parse(rawData);
    console.log("function called with ".concat(topic));
    return JSON.stringify(rulebook[topic]);
};
exports.lookupRuling = lookupRuling;
exports.topicsOfRulebook = [
    'deck',
    'extraDeck',
    'sideDeck',
    'additionalItems',
    'gameMat',
    'monsterCards',
    'monsterEffects',
    'linkMonsters',
    'pendulumMonsterCards',
    'xyzMonsters',
    'SynchroMonsters',
    'fusionMonsters',
    'ritualMonsters',
    'summoningMonsterCards',
    'spellCards',
    'trapCards',
    'turnStructure',
    'damageStepRules',
    'chainsAndSpellSpeed',
    'MonsterTokens',
    'PublicKnowledge',
    'SimultaneousActions',
    'MultipleCardActivations',
    'ZeroATKMonsters',
    'RulesVsCardEffects',
    'Counters',
    'UnchainableActions',
    'Xyz Materials',
    'Leaves the Field',
    'Attack Directly',
    'Banished Cards (Previously Remove from Play)',
    'Battle / Battled',
    'Battle Damage',
    'Cards on the Field',
    'Colon (:) and Semi-colon (;)',
    'Control / Possess',
    'Destroy',
    'Discard',
    'Effects of Cards',
    'Equip Cards',
    'Equipped Monster',
    'Excavate',
    'Original ATK (or DEF)',
    'Pay a Cost',
    'piercingBattleDamage',
    'Random',
    'Reveal',
    'searchYourDeck',
    'sendToTheGraveYard',
    'Set',
    'Shuffle',
    'Tribute',
];
