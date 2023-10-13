import { useState } from 'react'
import './styles/App.css'
import KaibaChat from './components/KaibaChat'

function App() {
	const [requestInProgress, setRequestInProgress] = useState(false)
	return (
		<>
			{/* <div>
				<h3>Test Server</h3>
				<button onClick={testServer}>Test</button>
				<p>{test}</p>
			</div> */}
			{/* <GetFact
				requestInProgress={requestInProgress}
				setrequestInProgress={setrequestInProgress}
			/> */}
			{/* <GetTranscription
				requestInProgress={requestInProgress}
				setrequestInProgress={setrequestInProgress}
			/> */}

			<KaibaChat
				requestInProgress={requestInProgress}
				setRequestInProgress={setRequestInProgress}
			/>
		</>
	)
}

export default App
