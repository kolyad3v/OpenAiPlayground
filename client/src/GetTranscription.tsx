import React, { FC, ReactNode, useState } from 'react'

const GetTranscription: FC<{
	requestInProgress: boolean
	setrequestInProgress: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ requestInProgress, setrequestInProgress }): ReactNode => {
	const [text, setText] = useState('')

	const generateTranscription = async () => {
		if (!requestInProgress) {
			try {
				setrequestInProgress(true)
				const res = await fetch('http://localhost:3000/transcription', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.status !== 200) {
					throw new Error(`Req failed with status ${res.status}`)
				}
				const data = await res.json()
				setText(data.message)
				setrequestInProgress(false)
			} catch (error) {
				alert(error)
				setrequestInProgress(false)
			}
		} else {
			alert('wait your fucking turn')
		}
	}

	let mediaRecorder
	let audioChunks: BlobPart[] = []

	const startRecord = () => {
		console.log('starts')
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			mediaRecorder = new MediaRecorder(stream)
			mediaRecorder!.onstop = () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
				sendDataToServer(audioBlob)
				console.log('stops')
			}
			mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data)
			}
		})
	}

	const sendDataToServer = (audioBlob: Blob) => {
		const formData = new FormData()
		formData.append('audio', audioBlob, 'audio.wav')

		fetch('https://localhost:3000/transcription/upload', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err))
	}

	return (
		<>
			<div>
				<h3>Audio To Text</h3>

				<button onClick={generateTranscription}>Generate</button>
				<p>{text}</p>
				<button onClick={() => startRecord()}>Start Rec</button>
				<button onClick={() => mediaRecorder!.onstop()}>Stop Rec</button>
			</div>
		</>
	)
}

export default GetTranscription
