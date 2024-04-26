/** @format */

import React from 'react';
import styles from './statistics.module.css';

function Statictics({ progress, totalPages }) {
	const totalReadPages = progress.reduce((totalReadPages, process) => {
		if (process?.finishPage && process?.startPage) {
			const countPages = process.finishPage - process.startPage;
			totalReadPages += countPages;
			return totalReadPages;
		}
	}, 0);
	const totalReadPageProcent = parseInt((totalReadPages / totalPages) * 100).toFixed(2);

	return (
		<ul className={styles.main}>
			<li className={styles.progress_indicator_block}>
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
