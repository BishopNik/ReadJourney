/** @format */

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['rgb(48, 185, 77)', 'rgb(31, 31, 31)'];

const DonutChart = ({ data }) => (
	<PieChart width={116} height={116}>
		<Pie
			data={data}
			dataKey='value'
			cx={53}
			cy={53}
			innerRadius={48} // Внутренний радиус (для создания донат-эффекта)
			outerRadius={58} // Внешний радиус
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

export default DonutChart;
