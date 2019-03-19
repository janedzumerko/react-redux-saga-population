import React from 'react';

const size = 100;
const radCircumference = Math.PI * 2;
const center = size / 2;
const radius = center - 1;

function renderPaths(slices) {
	const total = slices.reduce((totalValue, { population }) => totalValue + population, 0);

	let radSegment = 0;
	let lastX = radius;
	let lastY = 0;

	return slices.map(({ color, population }, index) => {

		if (population === total) {
			return <circle r={radius} cx={center} cy={center} fill={color} key={index} />;
		}

		if (population === 0) {
			return;
		}

		const valuePercentage = population / total;


		const longArc = valuePercentage <= 0.5 ? 0 : 1;

		radSegment += valuePercentage * radCircumference;
		const nextX = Math.cos(radSegment) * radius;
		const nextY = Math.sin(radSegment) * radius;

		const d = [
			`M ${center},${center}`,
			`l ${lastX},${-lastY}`,
			`a${radius},${radius}`,
			'0',
			`${longArc},0`,
			`${nextX - lastX},${-(nextY - lastY)}`,
			'z',
		].join(' ');

		lastX = nextX;
		lastY = nextY;

		return <path d={d} fill={color} key={index} />;
	});
}

export default class PieChart extends React.Component {

	render() {
		const border =
			this.props.borderWidth > 0 ? (
				<circle
					cx={center}
					cy={center}
					r={radius}
					stroke={this.props.borderColor}
					strokeWidth={this.props.borderWidth}
					fill="transparent"
				/>
			) : null;

		return (
			<svg viewBox={`0 0 ${size} ${size}`}>
				<g transform={`rotate(-90 ${center} ${center})`}>{renderPaths(this.props.slices)}</g>
				{border}
			</svg>
		);
	}
}
