export default interface IColor {
	red: number;
	green: number;
	blue: number;
};

export interface IShape {
	shape: boolean[][][];
	color: IColor;
	rotation: number;
};

export interface IShapeWithPosition extends IShape {
	top: number;
	left: number;
};

export interface IShapeStore {
	current: IShapeWithPosition;
	next: IShape;
};