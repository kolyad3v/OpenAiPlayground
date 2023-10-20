import OpenAI from "openai";
import { functionMessageObject, lookupCard, lookupRuling } from "../utils";

export const runAiFunctionCallAndGetMessage = (
	aiResponse: OpenAI.Chat.Completions.ChatCompletionMessage
): functionMessageObject => {
	const availableFunctions = {
		lookup_card: lookupCard,
		lookup_ruling: lookupRuling,
	};

	let functionDetailsForCSV: { name: string; argument: string } = {
		name: "",
		argument: "",
	};

	const functionName = aiResponse.function_call!.name;
	functionDetailsForCSV.name = functionName;
	//@ts-ignore
	const functionToCall = availableFunctions[functionName];
	const functionArgs = JSON.parse(aiResponse.function_call!.arguments);
	let functionResponse: string;
	if (functionName === "lookup_card") {
		functionResponse = functionToCall(functionArgs.cardName);
	} else if (functionName === "lookup_ruling") {
		functionResponse = functionToCall(functionArgs.topic);
		functionDetailsForCSV.argument = functionArgs.topic;
	} else {
		throw new Error(`Error in handling function call ${functionName} `);
	}
	return {
		role: "function",
		name: functionName,
		content: functionResponse,
	};
};
