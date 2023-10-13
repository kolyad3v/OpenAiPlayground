import { useState } from 'react'
import './styles/App.css'
import KaibaChat from './components/KaibaChat'

function App() {
	const [requestInProgress, setRequestInProgress] = useState(false)
	return (
		<>
			<KaibaChat
				requestInProgress={requestInProgress}
				setRequestInProgress={setRequestInProgress}
			/>
		</>
	)
}

export default App
