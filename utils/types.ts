export interface IMessage {
	role: 'system' | 'assistant' | 'user' | 'function'
	name?: string
	content: string
}
