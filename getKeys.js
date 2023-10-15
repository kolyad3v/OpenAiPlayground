const fs = require('fs')
function getKeysOfRulebook() {
	const rawData = fs.readFileSync('rulebook.json', 'utf-8')
	const rulebook = JSON.parse(rawData)
	console.log(Object.keys(rulebook))
}

getKeysOfRulebook()
