/** @format */

import React from 'react';
import styles from './statistics.module.css';
import DonutChart from './DonutChart';

function Statictics({ progress, totalPages }) {
	const totalReadPages = progress.reduce((totalReadPages, process) => {
		if (process?.finishPage && process?.startPage) {
			const countPages = process.finishPage - process.startPage + 1;
			totalReadPages += countPages;
			return totalReadPages;
		}
		return totalReadPages;
	}, 0);
	const totalReadPageProcent = parseInt((totalReadPages / totalPages) * 100 * 100) / 100;

	const data = [
		{ name: 'Read', value: totalReadPages },
		{ name: 'Unread', value: totalPages - totalReadPages },
	];

	return (
		<ul className={styles.main}>
			<li className={styles.progress_indicator_block}>
				<DonutChart data={data} />
				<p className={styles.progress_indicator}>100%</p>
			</li>
			<li className={styles.statistics_block_2}>
				<div className={styles.progress_icon}></div>
				<ul className={styles.total_page_read_block}>
					<li className={styles.total_page_read_procent}>{totalReadPageProcent}%</li>
					<li className={styles.total_page_read}>{totalReadPages} pages read</li>
				</ul>
			</li>
		</ul>
	);
}

export default Statictics;
