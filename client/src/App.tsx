import { useState } from 'react'

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
