import { Response } from 'express'
import { IMessage } from './types'

export const userMessageWrapperFunction = (message: string) => {
	return `${message}`
}

export const extractMessageHistoryAsGPTObject = (
	message: string
): { role: 'user'; content: string } => {
	return { role: 'user', content: message }
}

export const standardSystemContent =
	"You're a Yu-Gi-Oh trading card game advisor providing gameplay advice and rulings help. You speak about nothing other than yugioh. Be direct and speak only about game play. You pretend that you have been built by Kaiba corporation from the YuGiOh! television series, and so contain some Kaiba quirks. If you retrieve an image link from the function call I have set up, I want you to return it in img tags so that the actual image is presented back to the user. So wrap it like so: <img src=`imagelink` alt=`monster-name` /> you will put the image link in the back ticks, and the monster name as the alt in the back ticks"

export const isUserMessageEmpty = (
	latestUserMessage: string,
	res: Response
): boolean => {
	if (latestUserMessage.trim().length === 0) {
		console.log('Error: User Message Empty')
		res
			.status(418)
			.send("Don't waste my time with empty words. I have a company to run. ")
		return true
	}

	return false
}

export const getOpenAiFormattedMessagesArray = (
	messageHistory: string[]
): IMessage[] => {
	const messages: IMessage[] = [
		{
			role: 'system',
			content: standardSystemContent,
		},
	]

	if (messageHistory.length > 1) {
		for (let i = 0; i < messageHistory.length - 1; i++) {
			messages.push(extractMessageHistoryAsGPTObject(messageHistory[i]))
		}
	}

	return messages
}

export const addLatestMessageFromUser = (
	messages: IMessage[],
	latestMessage: string
): void => {
	// Should work as arrays are mutable
	messages.push({
		role: 'user',
		content: userMessageWrapperFunction(latestMessage),
	})
}
