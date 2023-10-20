import { Router, Request, Response } from "express";
import OpenAI from "openai";
import {
	storeUserMessageAndAIResponseInCSVdb as storeInCSV,
	lookupCard,
	isUserMessageEmpty,
	IMessage,
	getOpenAiFormattedMessagesArray,
	addLatestMessageFromUser,
	lookupRuling,
	firstCompletion,
	getCompletionWithMessages,
} from "../utils";

const router = Router();

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

router.post("/", async (req: Request, res: Response) => {
	const { messageHistory: userMessageHistory }: { messageHistory: string[] } =
		req.body;
	const latestUserMessage = userMessageHistory[userMessageHistory.length - 1];

	if (isUserMessageEmpty(latestUserMessage, res)) {
		return;
	}

	try {
		const messages: IMessage[] =
			getOpenAiFormattedMessagesArray(userMessageHistory);
		addLatestMessageFromUser(messages, latestUserMessage);

		const completion = await firstCompletion(openai, messages);

		const firstAiResponse = completion.choices[0].message;

		if (!firstAiResponse.function_call) {
			const firstAiResponseContent = firstAiResponse.content;
			storeInCSV(latestUserMessage, firstAiResponseContent as string);
			res.json({ message: `${firstAiResponse.content}` });
			return;
		}

		let functionDetailsForCSV: { name: string; argument: string } = {
			name: "",
			argument: "",
		};

		if (firstAiResponse.function_call) {
			const availableFunctions = {
				lookup_card: lookupCard,
				lookup_ruling: lookupRuling,
			};
			const functionName = firstAiResponse.function_call.name;
			functionDetailsForCSV.name = functionName;
			//@ts-ignore
			const functionToCall = availableFunctions[functionName];
			const functionArgs = JSON.parse(firstAiResponse.function_call.arguments);
			let functionResponse: string;
			if (functionName === "lookup_card") {
				functionResponse = functionToCall(functionArgs.cardName);
			} else if (functionName === "lookup_ruling") {
				functionResponse = functionToCall(functionArgs.topic);
				functionDetailsForCSV.argument = functionArgs.topic;
			} else {
				throw new Error(`Error in handling function call ${functionName} `);
			}
			messages.push({
				role: "function",
				name: functionName,
				content: functionResponse,
			}); // extend conversation with function response
		}

		const secondAiResponse = await getCompletionWithMessages(openai, messages);

		const secondAiResponseContent = secondAiResponse.choices[0].message.content;

		try {
			storeInCSV(
				latestUserMessage,
				secondAiResponseContent as string,
				functionDetailsForCSV
			);
		} catch (err) {
			console.error("Error saving to CSV db", err);
		}

		res.json({ message: `${secondAiResponseContent}` });
	} catch (error: any) {
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).send(error.response.data);
		}
		console.error(`eroor with api req: ${error.message}`);
		res.status(500).send("error occured during the request");
	}
});

module.exports = router;
