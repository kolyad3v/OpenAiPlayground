import React, { ChangeEvent, FC, ReactNode, useState } from 'react'

const KaibaChat: FC<{
	requestInProgress: boolean
	setrequestInProgress: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ requestInProgress, setrequestInProgress }): ReactNode => {
	const [chat, setChat] = useState<string[]>([])
	const [userChat, setUserChat] = useState<string>('')
	const [userChatHistory, setUserChatHistory] = useState<string[]>([])

	const sendMessage = async () => {
		if (!requestInProgress) {
			if (userChat.length === 0) {
				alert("please enter a message or don't wast my time")
				return
			}
			try {
				setrequestInProgress(true)
				setUserChat('')

				const res = await fetch('http://localhost:3000/api/kaibaChat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ message: userChat }),
				})
				if (res.status !== 200) {
					throw new Error(`Req failed with status ${res.status}`)
				}
				const data = await res.json()
				setUserChatHistory((userChatHistory) => [...userChatHistory, userChat])
				setChat((chat) => [...chat, data.message])
				setrequestInProgress(false)
			} catch (error) {
				alert(error)
				setrequestInProgress(false)
				setUserChat('')
			}
		} else {
			alert('wait your fucking turn')
		}
	}

	const sendMessageOnEnter = (e: { keyCode: number }) => {
		if (e.keyCode === 13) {
			setUserChat('')
			sendMessage()
		}
	}

	const onchange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setUserChat(`${e.target.value}`)
	}

	const chatHistory = chat.map((msg, index) => (
		<div key={index}>
			{userChatHistory[index] !== null ? (
				<p id="user-text">{userChatHistory[index]}</p>
			) : null}
			<p id="bot-text">{msg}</p>
		</div>
	))

	return (
		<>
			<div>
				<img
					src="./kaiba.jpg"
					alt="picture of seto, no.2 duelist"
					style={{ maxHeight: '160px' }}
				/>
				<h3>Speak Peasant</h3>
				{chatHistory}
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
					onClick={sendMessage}
					style={{ display: 'block', margin: '0 auto', width: '160px' }}
				>
					Send
				</button>
			</div>
		</>
	)
}

export default KaibaChat
