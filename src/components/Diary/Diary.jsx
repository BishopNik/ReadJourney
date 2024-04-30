/** @format */

import React from 'react';
import moment from 'moment';
import clsx from 'clsx';
import Icon from 'components/Icon';
import styles from './diary.module.css';

function Diary({ progress, totalPages, deleteReadingOfBook }) {
	return (
		<ul className={styles.main}>
			{progress
				.map(
					(el, idx) =>
						el.finishPage && (
							<li key={el._id} className={styles.container_item}>
								<div className={styles.item_first}>
									<ul className={styles.container_item_data}>
										<li
											className={clsx(
												styles.item_data_icon_ext,
												idx === progress.length - 1 &&
													styles.item_data_icon_ext_sec
											)}
										>
											<div className={styles.item_data_icon_in}></div>
										</li>
										<li className={styles.item_data_icon_line}></li>
										<li>
											<p className={styles.item_data}>
												{moment(el.finishReading).format('DD.MM.YYYY')}
											</p>
										</li>
									</ul>
									<p className={styles.item_pages}>
										{el.finishPage - el.startPage} pages
									</p>
								</div>
								<div className={styles.item_two}>
									<ul className={styles.container_stat}>
										<li>
											<ul className={styles.container_stat_procent}>
												<li>
													<p className={styles.stat_procent}>
														{(
															parseInt(
																((el.finishPage - el.startPage) /
																	totalPages) *
																	100 *
																	100,
																10
															) / 100
														).toFixed(2)}
														%
													</p>
												</li>
												<li>
													<p className={styles.stat_minute}>
														{moment(el.finishReading).diff(
															el.startReading,
															'minutes'
														)}{' '}
														minutes
													</p>
												</li>
											</ul>
										</li>
										<li>
											<ul className={styles.container_chart_info}>
												<li>
													<Icon
														name={'chart'}
														className={styles.chart_icon}
													/>
												</li>
												<li className={styles.container_page_in_min}>
													<p className={styles.page_in_min}>
														{el.speed} pages
														<br /> per hour
													</p>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<button
									className={styles.button}
									type='button'
									onClick={() => deleteReadingOfBook(el._id)}
								>
									<Icon name={'trash-2'} className={styles.button_trash} />
								</button>
							</li>
						)
				)
				.reverse()}
		</ul>
	);
}

export default Diary;
