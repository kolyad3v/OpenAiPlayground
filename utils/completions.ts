import OpenAI from "openai";
import { IMessage } from "./types";
import { getKeysOfRulebook } from "./gptFunctions";
import { APIPromise } from "openai/core";
import { ChatCompletion } from "openai/resources/chat";

export const firstCompletion = async (
	openAiInstance: OpenAI,
	messages: IMessage[]
): Promise<APIPromise<ChatCompletion>> => {
	return await openAiInstance.chat.completions.create({
		messages,
		model: "gpt-3.5-turbo",
		temperature: 0.1,
		functions: [
			{
				name: "lookup_card",
				description:
					"use this function to look up the exact details of a card from the user message",
				parameters: {
					type: "object",
					properties: {
						cardName: {
							type: "string",
							description: "the name of the card the user is referring to, eg dark magician",
						},
					},
					required: ["cardName"],
				},
			},
			{
				name: "lookup_ruling",
				description: `use this function if the user mentions any of the key words from this array ${getKeysOfRulebook()} to get a more accurate definition from the official rulebook I have extracted for you`,
				parameters: {
					type: "object",
					properties: {
						topic: {
							type: "string",
							description:
								"the exact word from the array of key words. This will be exact to match a key to retreive the relavent data",
						},
					},
					required: ["topic"],
				},
			},
		],
	});
};

export const getCompletionWithMessages = async (
	openAiInstance: OpenAI,
	messages: IMessage[]
): Promise<APIPromise<ChatCompletion>> => {
	return await openAiInstance.chat.completions.create({
		messages,
		model: "gpt-3.5-turbo",
		temperature: 0.1,
	});
};
