import React, { FC, ReactNode, useState } from 'react'

const GetFact: FC<{
	requestInProgress: boolean
	setrequestInProgress: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ requestInProgress, setrequestInProgress }): ReactNode => {
	const [fact, setFact] = useState('')

	const generateFact = async () => {
		if (!requestInProgress) {
			try {
				setrequestInProgress(true)
				const res = await fetch('http://localhost:3000/fact', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.status !== 200) {
					throw new Error(`Req failed with status ${res.status}`)
				}
				const data = await res.json()
				setFact(data.message)
				setrequestInProgress(false)
			} catch (error) {
				alert(error)
				setrequestInProgress(false)
			}
		} else {
			alert('wait your fucking turn')
		}
	}
	return (
		<>
			<div>
				<h3>Interesting Fact Generator</h3>

				<button onClick={generateFact}>Generate</button>
				<p>{fact}</p>
			</div>
		</>
	)
}

export default GetFact
