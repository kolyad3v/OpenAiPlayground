import fs from 'fs'

export const storeUserMessageAndAIResponseInCSVdb = (
	userMessage: string,
	AIresponse: string,
	aiHelperFunction?: { name: string; argument: string }
): void => {
	// Wrap it in quotes to handle commas in the message
	const prepUserMessageForCSV = `"${userMessage}"\n`
	const prepAIMessageForCSV = `"${AIresponse}"\n`

	// Escape quotes and wrap each field in quotes
	const formattedUserMessageForCSV = `"${prepUserMessageForCSV.replace(
		/"/g,
		'""'
	)}"`
	const formattedAIMessageForCSV = `"${prepAIMessageForCSV.replace(
		/"/g,
		'""'
	)}"`
	let CSV_ENTRY = `${formattedUserMessageForCSV},${formattedAIMessageForCSV}\n`

	if (aiHelperFunction) {
		CSV_ENTRY = `${formattedUserMessageForCSV},${formattedAIMessageForCSV}, ${aiHelperFunction.name}, ${aiHelperFunction.argument}\n`
	}

	// Combine question and answer into a single CSV line

	try {
		fs.appendFileSync('responses.csv', CSV_ENTRY)
	} catch (error) {
		console.error('Error saving to CSV db', error)
		throw error
	}
}
