/** @format */

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['rgb(48, 185, 77)', 'rgb(31, 31, 31)'];

const DonutChart = ({ data }) => {
	const radiusOut = () => {
		if (window.innerWidth < 768) {
			return 58;
		} else if (window.innerWidth < 1280) {
			return 69;
		} else {
			return 84;
		}
	};

	const radiusIn = () => {
		if (window.innerWidth < 768) {
			return 48;
		} else if (window.innerWidth < 1280) {
			return 57;
		} else {
			return 69;
		}
	};

	const center = () => {
		if (window.innerWidth < 768) {
			return 53;
		} else if (window.innerWidth < 1280) {
			return 63;
		} else {
			return 76.5;
		}
	};

	const diametr = () => {
		if (window.innerWidth < 768) {
			return 116;
		} else if (window.innerWidth < 1280) {
			return 138;
		} else {
			return 168;
		}
	};

	return (
		<PieChart width={diametr()} height={diametr()}>
			<Pie
				data={data}
				dataKey='value'
				cx={center()}
				cy={center()}
				innerRadius={radiusIn()} // Внутренний радиус (для создания донат-эффекта)
				outerRadius={radiusOut()} // Внешний радиус
				paddingAngle={0} // Отступ между секциями
				startAngle={90} // Начальный угол (в градусах)
				endAngle={-450} // Конечный угол (в градусах)
				stroke={'none'}
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
		</PieChart>
	);
};

export default DonutChart;
