/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import Icon from 'components/Icon';
import styles from '../styles/recommended.module.css';
import { useDispatch } from 'react-redux';
import Dashboard from 'components/Dashboard';

function RecommendedPage() {
	const dispatch = useDispatch();

	const handleSubmit = (values, actions) => {
		// dispatch(register(values));
		actions.resetForm({ title: '', author: '' });
	};

	return (
		<ul className={styles.main}>
			<Dashboard>
				<p className={styles.title_dashboard}>Filters:</p>
				<Formik
					initialValues={{ title: '', author: '' }}
					onSubmit={(values, actions) => {
						handleSubmit(values, actions);
					}}
				>
					{({ isSubmitting }) => (
						<Form autoComplete='off'>
							<div className={styles.field_container}>
								<label className={styles.field}>
									Book title:
									<Field
										className={styles.field_input}
										name='title'
										type='text'
										placeholder='Enter text'
									/>
								</label>
								<label className={styles.field}>
									The author:
									<Field
										className={styles.field_input}
										name='author'
										type='text'
										placeholder='Enter text'
									/>
								</label>
							</div>
							<button
								className={styles.button_action}
								type='submit'
								disabled={isSubmitting}
							>
								To apply
							</button>
						</Form>
					)}
				</Formik>
				<div className={styles.library_block}>
					<p className={styles.library_title}>Start your workout</p>
					<ul className={styles.list_container}>
						<li className={styles.list_container_item}>
							<div className={styles.num_item}>1</div>
							<p className={styles.text_item}>
								<span className={styles.text_item_ext}>
									Create a personal library:
								</span>
								<span>
									{' '}
									add the books you intend to read <br />
									to it.
								</span>
							</p>
						</li>
						<li className={styles.list_container_item}>
							<div className={styles.num_item}>2</div>
							<p className={styles.text_item}>
								<span className={styles.text_item_ext}>
									Create your first workout:
								</span>
								<span> define a goal, choose a period, start training.</span>
							</p>
						</li>
					</ul>
					<ul className={styles.link_container}>
						<li>
							<Link to={'/library'} className={styles.link_to}>
								My library
							</Link>
						</li>
						<li className={styles.container_icon_link}>
							<Icon name={'library'} className={styles.icon_link} />
						</li>
					</ul>
				</div>
			</Dashboard>
			<li className={styles.recomm_book}>
				<p className={styles.title_recom}>Recommended</p>
				<ul className={styles.button_nav_container}>
					<li>
						<button className={styles.button_nav} type='button'>
							<Icon name={'nav_left'} className={styles.icon_nav} />
						</button>
					</li>
					<li>
						<button className={styles.button_nav} type='button'>
							<Icon name={'nav_rigth'} className={styles.icon_nav} />
						</button>
					</li>
				</ul>
				<ul className={styles.book_container}>
					<li className={styles.book}></li>
					<li className={styles.book}></li>
				</ul>
			</li>
		</ul>
	);
}

export default RecommendedPage;
