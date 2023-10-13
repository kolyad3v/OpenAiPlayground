import fs from 'fs'

export const appendToCsv = (question: string, answer: string): void => {
	// Escape quotes and wrap each field in quotes
	const formattedQuestion = `"${question.replace(/"/g, '""')}"`
	const formattedAnswer = `"${answer.replace(/"/g, '""')}"`

	// Combine question and answer into a single CSV line
	const csvString = `${formattedQuestion},${formattedAnswer}\n`

	fs.appendFileSync('responses.csv', csvString)
}
