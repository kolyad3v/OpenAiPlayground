import React, { FC, ReactNode, useState } from 'react'

const KaibaChat: FC<{
	requestInProgress: boolean
	setrequestInProgress: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ requestInProgress, setrequestInProgress }): ReactNode => {
	const [chat, setChat] = useState<string[]>(['screw the rules, I have money'])
	const [userChat, setUserChat] = useState<string>('second')

	const sendMessage = async () => {
		if (!requestInProgress) {
			try {
				setrequestInProgress(true)
				const res = await fetch('http://localhost:3000/kchat', {
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
				setChat((chat) => [...chat, data.message])
				setrequestInProgress(false)
				setUserChat('')
			} catch (error) {
				alert(error)
				setrequestInProgress(false)
				setUserChat('')
			}
		} else {
			alert('wait your fucking turn')
		}
	}

	const onchange = (e) => {
		setUserChat(`${e.target.value}`)
	}
	const chatHistory = chat.map((msg, index) => (
		<p
			id='bot-text'
			key={index}
		>
			{msg}
		</p>
	))
	return (
		<>
			<div>
				<h3>Speak</h3>

				<textarea
					onChange={onchange}
					name='textbox'
					id=''
					cols={50}
					rows={10}
				></textarea>
				<button
					onClick={sendMessage}
					style={{ display: 'block', margin: '0 auto', width: '160px' }}
				>
					Send
				</button>
				{chatHistory}
			</div>
		</>
	)
}

export default KaibaChat
