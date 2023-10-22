export interface IMessage {
	role: 'system' | 'assistant' | 'user' | 'function'
	name?: string
	content: string
}

export interface functionMessageObject extends IMessage {
	role: 'function'
	name: string
	content: functionResponseType
	functionArgument: string
}

export type functionResponseType = string
