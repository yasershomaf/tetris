import React, { useState } from 'react';

import './app.css';

const App = () => {
	const [gameStatus, setGameStatus] = useState<'started' | 'paused' | 'stopped'>('stopped');

	return <div className="container">
		<div className="game-area"></div>

		<div className="game-info">
			<div className="next-shape"></div>

			<div className="game-scores">
				<div>Level:</div>
				<div></div>
				<div>Lines:</div>
				<div></div>
				<div>Score:</div>
				<div></div>
			</div>

			{gameStatus === 'stopped' && <button
				className="game-button start-button"
			>Start</button>}

			{gameStatus === 'started' && <button
				className="game-button pause-button"
			>Pause</button>}

			{gameStatus === 'paused' && <>
				<button
					className="game-button continue-button"
				>Continue</button>

				<button
					className="game-button stop-button"
				>Stop</button>
			</>}
		</div>
	</div>;
}

export default App;