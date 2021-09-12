import React, { FC } from 'react';

import IColor from '../../services/types';

import Box from '../box/box';

import './shape.css';

const Shape: FC<{
	shape: boolean[][], color: IColor, rotation: number, top: number, left: number
}> = ({	shape, color, rotation, top, left}) => {
	const boxWidth = 0.05 * window.innerHeight - 0.5;

	return <div className="shape-container" style={{
		top: top * boxWidth,
		left: left * boxWidth,
		transform: `rotate(${rotation}deg)`
	}}>
		{shape.map((row, rowIndex) => <div key={rowIndex} className="shape-row">
			{row.map((box, boxIndex) => box ? <Box
				key={boxIndex}
				color={color}
				rotation={rotation % 360}
			/> : <div key={boxIndex} />)}
		</div>)}
	</div>;
};

export default Shape;