import React, { FC } from 'react';

import IColor from '../../services/types';

import './box.css';

const Box: FC<{color: IColor, rotation?: number}> = ({color, rotation= 0}) => {
	const {red, green, blue} = color;

	const darkColor = `rgb(${Math.round(red / 2)}, ${
		Math.round(green / 2)
	}, ${Math.round(blue / 2)})`;

	const lightColor = `rgb(${Math.min(red * 2, 255)}, ${
		Math.min(green * 2, 255)
	}, ${Math.min(blue * 2, 255)})`;

	return <div className="box" style={{
		backgroundColor: `rgb(${red}, ${green}, ${blue})`,
		borderColor: rotation === 90 ? `${darkColor} ${darkColor} ${lightColor} ${
			lightColor
		}` : rotation === 180 ? `${darkColor} ${lightColor} ${lightColor} ${
			darkColor
		}` : rotation === 270 ? `${lightColor} ${lightColor} ${darkColor} ${
			darkColor
		}` : `${lightColor} ${darkColor} ${darkColor} ${lightColor}`
	}} />;
};

export default Box;