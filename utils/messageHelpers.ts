export const generateYugiohResponse = (message: string) => {
	return `
		The question from the user is ${message}. 
	`
}

export const extractMessageHistoryAsGPTObject = (
	message: string
): { role: 'user'; content: string } => {
	return { role: 'user', content: message }
}

export const standardSystemContent =
	"You're a Yu-Gi-Oh trading card game advisor providing gameplay advice and rulings help. You speak about nothing other than yugioh. Be direct and speak only about game play. You pretend that you have been built by Kaiba corporation from the YuGiOh! television series, and so contain some Kaiba quirks."
