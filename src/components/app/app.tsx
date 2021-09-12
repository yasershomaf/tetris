import React, { useState, useRef } from 'react';

import IColor from '../../services/types';

import Shape from '../shape/shape';
import Box from '../box/box';

import './app.css';

const App = () => {
	const [gameStatus, setGameStatus] = useState<'started' | 'paused' | 'stopped'>('stopped');

	const [grid, setGrid] = useState<(IColor | null)[][]>(Array.from(
		{length: 20}, row => Array.from({length: 10}, boxColor => null)
	));

	const shapesRef = useRef<boolean[][][]>([
		[[false, true, false], [true, true, true], [false, false, false]],
		[[false, true, false], [false, true, false], [false, true, true]],
		[[false, true, false], [false, true, false], [true, true, false]],
		[[true, true, false], [false, true, true], [false, false, false]],
		[[false, true, true], [true, true, false], [false, false, false]],
		[[false, true, true, true, true]],
		[[true, true], [true, true]]
	]);

	const getNewShape = () => shapesRef.current[Math.floor(Math.random() * 7)];

	const getNewColor = () => ({
		red: Math.floor(Math.random() * 256),
		green: Math.floor(Math.random() * 256),
		blue: Math.floor(Math.random() * 256)
	})

	const [nextShape, setNextShape] = useState<boolean[][]>(getNewShape());
	const [nextShapeRotation, setNextShapeRotation] = useState<number>(
		Math.floor(Math.random() * 4) * 90
	);
	const [nextShapeColor, setNextShapeColor] = useState<IColor>(getNewColor());

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
			<div className="next-shape">
				<Shape
					shape={nextShape}
					color={nextShapeColor}
					rotation={nextShapeRotation}
					left={(7 - nextShape[0].length) / 2}
					top={(7 - nextShape.length) / 2}
				/>
			</div>

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