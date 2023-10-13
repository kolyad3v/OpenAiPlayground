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
