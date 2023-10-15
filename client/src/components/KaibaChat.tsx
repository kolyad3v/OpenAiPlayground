import axios, { AxiosResponse } from 'axios'
import { nanoid } from 'nanoid'

import React, { ChangeEvent, FC, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ChatProps {
	requestInProgress: boolean
	setRequestInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const KaibaChat: FC<ChatProps> = ({
	requestInProgress,
	setRequestInProgress,
}) => {
	const [chat, setChat] = useState<string[]>([])
	const [userMessage, setuserMessage] = useState<string>('')
	const [conversationHistory, setConversationHistory] = useState<string[]>([])

	const isAwaitingResponse = (): boolean => {
		if (requestInProgress) {
			toast.warn("I'm working on it!", {
				position: 'top-center',

				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
			})
			return true
		}
		return false
	}

	const isEmptyUserMessage = (): boolean => {
		if (userMessage === '') {
			toast.warn('No empty words please', {
				position: 'top-center',
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
			})
			return true
		}
		return false
	}

	const sendConversation = async (conversationHistoryArray: string[]) => {
		try {
			const dataToSend = {
				messageHistory: [...conversationHistoryArray],
			}
			const res: AxiosResponse = await axios.post('/api/kaibaChat', dataToSend)

			if (res.status !== 200) {
				throw new Error(`Req failed with status ${res.status}`)
			}
			setChat((chat) => [...chat, res.data.message])
			setRequestInProgress(false)
		} catch (error: any) {
			setRequestInProgress(false)
			console.error(error.message)
			toast.warning(error.response.data)
		}
	}
	const getUpdatedConversationHistory = (): string[] => {
		const updatedHistory = [...conversationHistory, userMessage]
		setConversationHistory(updatedHistory)
		return updatedHistory
	}

	const handleMessageSend = (): void => {
		if (isEmptyUserMessage() || isAwaitingResponse()) {
			return
		}
		setuserMessage('')
		setRequestInProgress(true)
		sendConversation(getUpdatedConversationHistory())
	}

	const sendMessageOnEnter = (e: { keyCode: number }) => {
		if (e.keyCode === 13) {
			handleMessageSend()
			setuserMessage('')
		}
	}

	const onchange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setuserMessage(`${e.target.value}`)
	}

	const renderChatHistory = () => {
		return conversationHistory.map((msg, index) => (
			<div key={nanoid()}>
				{<p id="user-text">{msg}</p>}
				{chat[index] && <p id="bot-text">{chat[index]}</p>}
			</div>
		))
	}
	return (
		<div className="container">
			<div className="left">
				<img
					src="./kaiba.jpg"
					alt="picture of seto, no.2 duelist"
					style={{ maxHeight: '160px' }}
				/>
				<h3>Speak Peasant</h3>
				{renderChatHistory()}
				{requestInProgress && (
					<img
						style={{ display: 'block', width: '80px', margin: '0 auto' }}
						src="./loading.svg"
					/>
				)}
			</div>
			<div className="right">
				<textarea
					onChange={onchange}
					onKeyDown={sendMessageOnEnter}
					value={userMessage}
					name="textbox"
					id=""
					cols={70}
					rows={10}
					style={{ maxWidth: '480px', margin: '24px 0' }}
				></textarea>
				<button
					onClick={handleMessageSend}
					style={{ display: 'block', margin: '0 auto', width: '160px' }}
				>
					Send
				</button>
			</div>
			<ToastContainer />
		</div>
	)
}

export default KaibaChat
