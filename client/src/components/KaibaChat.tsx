import axios, { AxiosResponse } from 'axios'
import { nanoid } from 'nanoid'

import React, { ChangeEvent, FC, ReactNode, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const KaibaChat: FC<{
	requestInProgress: boolean
	setRequestInProgress: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ requestInProgress, setRequestInProgress }): ReactNode => {
	const [chat, setChat] = useState<string[]>([])
	const [userChat, setUserChat] = useState<string>('')
	const [conversationHistory, setConversationHistory] = useState<string[]>([])

	const handleMessageSend = (): void => {
		if (testIfEmptyString() || testIfAwaitingResponse()) {
			return
		}
		setUserChat('')
		setRequestInProgress(true)
		const updatedHistory = [...conversationHistory, userChat]
		setConversationHistory(updatedHistory)
		sendConversation(updatedHistory)
	}

	const testIfAwaitingResponse = (): boolean => {
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

	const testIfEmptyString = (): boolean => {
		if (userChat === '') {
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
		} catch (error) {
			setRequestInProgress(false)
			console.error(error)
		}
	}

	const sendMessageOnEnter = (e: { keyCode: number }) => {
		if (e.keyCode === 13) {
			handleMessageSend()
			setUserChat('')
		}
	}

	const onchange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setUserChat(`${e.target.value}`)
	}

	return (
		<>
			<div>
				<img
					src="./kaiba.jpg"
					alt="picture of seto, no.2 duelist"
					style={{ maxHeight: '160px' }}
				/>
				<h3>Speak Peasant</h3>
				{chat.map((msg, index) => (
					<div key={nanoid()}>
						{conversationHistory[index] !== null ? (
							<p id="user-text">{conversationHistory[index]}</p>
						) : null}
						<p id="bot-text">{msg}</p>
					</div>
				))}
				{requestInProgress && (
					<img
						style={{ display: 'block', width: '80px', margin: '0 auto' }}
						src="./loading.svg"
					/>
				)}
				<textarea
					onChange={onchange}
					onKeyDown={sendMessageOnEnter}
					value={userChat}
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
		</>
	)
}

export default KaibaChat
