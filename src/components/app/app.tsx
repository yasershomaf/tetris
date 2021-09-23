import React, { useState, useRef, useReducer } from 'react';

import IColor from '../../services/types';

import Shape from '../shape/shape';
import Box from '../box/box';

import './app.css';

const App = () => {
	const [gameLevel, setGameLevel] = useState<number>(1);

	const [gameStatus, setGameStatus] = useState<'started' | 'paused' | 'stopped'>('stopped');

	const [grid, setGrid] = useState<(IColor | null)[][]>(Array.from(
		{length: 20}, (row) => Array.from({length: 10}, (boxColor) => null)
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
	});

	const [state, dispatch] = useReducer((state: any, action: any) => {
		const rotation = state.current.rotation % 360;

		let actualShape = state.current.shape;

		const noOfRows = actualShape.length;
		const noOcColumns = actualShape[0].length

		if (rotation === 90) {
			actualShape = Array.from({length: noOcColumns}, (
				row, rowIndex
			) => Array.from({length: noOfRows}, (
				col, colIndex
			) => actualShape[noOfRows - colIndex - 1][rowIndex]));
		} else if (rotation === 270) {
			actualShape = Array.from({length: noOcColumns}, (
				row, rowIndex
			) => Array.from({length: noOfRows}, (
				col, colIndex
			) => actualShape[colIndex][noOcColumns - rowIndex - 1]));
		} else if (rotation === 180) {
			actualShape = Array.from({length: noOfRows}, (
				row, rowIndex
			) => Array.from({length: noOcColumns}, (
				col, colIndex
			) => actualShape[noOfRows - rowIndex - 1][noOcColumns - colIndex - 1]));
		}

		let actualTop = state.current.top;
		let actualLeft = state.current.left;

		if (rotation === 90 || rotation === 270) {
			actualTop = actualTop + (noOfRows - noOcColumns) / 2;
			actualLeft = actualLeft + (noOcColumns - noOfRows) / 2;
		}

		switch(action.type) {
			case 'rotate':
				return {
					...state,
					current: {
						...state.current,
						rotation: state.current.rotation + 90
					}
				};
			case 'downWards':
				return {
					...state,
					current: {
						...state.current,
						top: state.current.top + 1
					}
				};
			case 'leftWards':
				return {
					...state,
					current: {
						...state.current,
						left: state.current.left - 1
					}
				};
			case 'rightWards':
				return {
					...state,
					current: {
						...state.current,
						left: state.current.left + 1
					}
				};
			case 'setShape':
				const isRotated = state.next.rotation % 180 > 0;
				const shapeWidth = state.next.shape[0].length;
				const shapeHeight = state.next.shape.length;
				return {
					current: {
						...state.next,
						top: -(!isRotated ? shapeHeight : shapeWidth),
						left: Math.floor((10 - (isRotated ? shapeHeight : shapeWidth)) / 2)
					},
					next: {
						shape: getNewShape(),
						color: getNewColor(),
						rotation: Math.floor(Math.random() * 4) * 90
					}
				};
		}
	}, {
		current: {
			shape: null,
			color: null,
			rotation: 0,
			top: 0,
			left: 0
		},
		next: {
			shape: getNewShape(),
			color: getNewColor(),
			rotation: Math.floor(Math.random() * 4) * 90
		}
	});

	const gameInterval = useRef<NodeJS.Timer | null>(null);

	const startHandler = () => {
		dispatch({type: 'setShape'});

		gameInterval.current = setInterval(() => {
			dispatch({type: 'downWards'});
		}, 600 - 100 * gameLevel);

		setGameStatus('started');
	};

	return <div className="container">
		<div className="game-area">
			{grid.map((row, rowIndex) => <div key={rowIndex} className="grid-row">
				{row.map((boxColor, boxIndex) => boxColor ? <Box
					key={boxIndex}
					color={boxColor}
				/> : <div key={boxIndex}></div>)}
			</div>)}

			{gameStatus === 'started' && <Shape {...state.current} />}
		</div>

		<div className="game-info">
			<div className="next-shape">
				<Shape
					{...state.next}
					left={(7 - state.next.shape[0].length) / 2}
					top={(7 - state.next.shape.length) / 2}
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
				onClick={startHandler}
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