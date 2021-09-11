import React, { useState } from 'react';

import IColor from '../../services/types';

import Box from '../box/box';

import './app.css';

const App = () => {
	const [gameStatus, setGameStatus] = useState<'started' | 'paused' | 'stopped'>('stopped');

	const [grid, setGrid] = useState<(IColor | null)[][]>(Array.from(
		{length: 20}, row => Array.from({length: 10}, boxColor => null)
	));

	return <div className="container">
		<div className="game-area">
			{grid.map((row, rowIndex) => <div key={rowIndex} className="grid-row">
				{row.map((boxColor, boxIndex) => boxColor ? <Box
					key={boxIndex}
					color={boxColor}
				/> : <div key={boxIndex}></div>)}
			</div>)}
		</div>

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