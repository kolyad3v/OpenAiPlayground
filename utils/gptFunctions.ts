import fs from 'fs'

export function lookupCard(cardName: string) {
	const rawData = fs.readFileSync('cards.json', 'utf-8')
	const cards = JSON.parse(rawData)

	const regexPattern = cardName.split(/\s+/).join('[-\\s]*')
	const regex = new RegExp(regexPattern, 'i')
	console.log(`function called with ${cardName}`)
	for (let card of cards) {
		if (regex.test(card.name)) {
			return JSON.stringify(card)
		}
	}
	return 'false' // Return null if the card is not found
}

export function getKeysOfRulebook(): string[] {
	const rawData = fs.readFileSync('rulebook.json', 'utf-8')
	const rulebook = JSON.parse(rawData)
	return Object.keys(rulebook)
}

export const lookupRuling = (topic: string): string => {
	const rawData = fs.readFileSync('rulebook.json', 'utf-8')
	const rulebook = JSON.parse(rawData)
	console.log(`function called with ${topic}`)
	return JSON.stringify(rulebook[topic])
}

export const topicsOfRulebook = [
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
]
