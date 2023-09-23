import { useState } from 'react'
import './App.css'
import GetFact from './GetFact'

import KaibaChat from './KaibaChat'

function App() {
	const [test, setTest] = useState('')
	const [requestInProgress, setrequestInProgress] = useState(false)

	const testServer = async () => {
		try {
			const res = await fetch('http://localhost:3000', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			console.log(res)
			if (res.status !== 200) {
				throw new Error(`Req failed with status ${res.status}`)
			}
			const data = await res.json()
			setTest(data.message)
		} catch (error) {
			alert(error)
		}
	}

	return (
		<>
			{requestInProgress && (
				<img
					src='./loading.gif'
					style={{ height: '80px' }}
				/>
			)}
			<div>
				<h3>Test Server</h3>
				<button onClick={testServer}>Test</button>
				<p>{test}</p>
			</div>
			<GetFact
				requestInProgress={requestInProgress}
				setrequestInProgress={setrequestInProgress}
			/>
			{/* <GetTranscription
				requestInProgress={requestInProgress}
				setrequestInProgress={setrequestInProgress}
			/> */}

			<KaibaChat
				requestInProgress={requestInProgress}
				setrequestInProgress={setrequestInProgress}
			/>
		</>
	)
}

export default App
