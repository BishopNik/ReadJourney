/** @format */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { logIn, register } from 'redux/auth/operations';
import { LoginSchema, RegisterSchema } from 'helpers/ModalSchemas';
import { useAuth } from 'hooks';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import styles from './authform.module.css';

const AuthForm = () => {
	const location = useLocation();
	const currentPage = location.pathname;
	const regPage = currentPage !== '/';
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const { isLoading } = useAuth();

	const initialValues = { name: '', email: '', password: '' };

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = (values, actions) => {
		regPage
			? dispatch(register(values))
			: dispatch(logIn({ email: values.email, password: values.password }));
		actions.resetForm(initialValues);
	};

	return (
		<>
			<div className={styles.container_logo}>
				<Icon name={'logo'} className={styles.icon_logo} />
				<h2 className={styles.text_logo}>read journey</h2>
			</div>
			<h1 className={styles.main_text}>
				Expand your mind, reading <span className={styles.main_text_ext}>a book</span>
			</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					handleSubmit(values, actions);
				}}
				validationSchema={regPage ? RegisterSchema : LoginSchema}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form autoComplete='off'>
						<div className={styles.field_container}>
							{regPage && (
								<label
									className={clsx(
										styles.field,
										errors.name && touched.name && styles.field_error,
										!errors.name && touched.name && styles.field_success
									)}
								>
									Name:
									<Field
										className={styles.field_input}
										name='name'
										type='text'
										placeholder='Ilona Ratushniak'
									/>
									<ErrorMessage
										className={styles.err_message}
										name='name'
										component='span'
									/>
									{errors.name && touched.name && styles.field_error && (
										<Icon name={'error'} className={styles.icon_status} />
									)}
									{!errors.name && touched.name && styles.field_success && (
										<Icon name={'success'} className={styles.icon_status} />
									)}
								</label>
							)}
							<label
								className={clsx(
									styles.field,
									errors.email && touched.email && styles.field_error,
									!errors.email && touched.email && styles.field_success
								)}
							>
								Mail:
								<Field
									className={styles.field_input}
									name='email'
									type='email'
									placeholder='Your@email.com'
								/>
								<ErrorMessage
									className={styles.err_message}
									name='email'
									component='span'
								/>
								{errors.email && touched.email && styles.field_error && (
									<Icon name={'error'} className={styles.icon_status} />
								)}
								{!errors.email && touched.email && styles.field_success && (
									<Icon name={'success'} className={styles.icon_status} />
								)}
							</label>
							<label
								className={clsx(
									styles.field,
									errors.password && touched.password && styles.field_error,
									!errors.password && touched.password && styles.field_success
								)}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								Password:
								<Field
									className={styles.field_input}
									name='password'
									type={showPassword ? 'text' : 'password'}
									placeholder={'Yourpasswordhere'}
								/>
								{isHovered && (
									<button
										className={styles.button_hide_password}
										type='button'
										onClick={togglePasswordVisibility}
									>
										{showPassword ? (
											<Icon
												name={'hide'}
												className={styles.icon_button_hide_password}
											/>
										) : (
											<Icon
												name={'show'}
												className={styles.icon_button_hide_password}
											/>
										)}
									</button>
								)}
								<ErrorMessage
									className={styles.err_message}
									name='password'
									component='span'
								/>
								{!errors.password && touched.password && (
									<span className={styles.err_success}>Password is secure</span>
								)}
								{!isHovered && (
									<>
										{errors.password &&
											touched.password &&
											styles.field_error && (
												<Icon
													name={'error'}
													className={styles.icon_status}
												/>
											)}
										{!errors.password &&
											touched.password &&
											styles.field_success && (
												<Icon
													name={'success'}
													className={styles.icon_status}
												/>
											)}
									</>
								)}
							</label>
							{!regPage && <div className={styles.empty_field}></div>}
						</div>
						<ul className={styles.action_container}>
							<li>
								<button
									className={clsx(
										styles.button_action,
										!regPage && styles.button_action_login
									)}
									type='submit'
									disabled={isSubmitting}
								>
									{regPage ? 'Registration' : 'Log in'}
								</button>
							</li>
							<li>
								{regPage ? (
									<Link to={'/'} className={styles.link_to_other_action}>
										Already have an account?
									</Link>
								) : (
									<Link
										to={'/registration'}
										className={styles.link_to_other_action}
									>
										Don’t have an account?
									</Link>
								)}
							</li>
						</ul>
					</Form>
				)}
			</Formik>
			{isLoading && <Loader />}
		</>
	);
};

export default AuthForm;
