/** @format */

import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { RegisterSchema } from 'helpers/ModalSchemas';
import { useAuth } from 'hooks';
import Loader from 'components/Loader';

import {
	Button,
	ButtonText,
	Container,
	ErrorMsg,
	LabelBox,
	Link,
	NavBox,
	StyledField,
	StyledForm,
	IconHideShow,
	StyledFieldContainer,
	FieldContainer,
} from './RegisterForm.styled';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const { isLoading } = useAuth();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = (values, actions) => {
		dispatch(register(values));
		actions.resetForm({ name: '', email: '', password: '' });
	};

	return isLoading ? (
		<Loader />
	) : (
		<Container>
			<Formik
				initialValues={{ name: '', email: '', password: '' }}
				onSubmit={(values, actions) => {
					handleSubmit(values, actions);
				}}
				validationSchema={RegisterSchema}
			>
				{({ isSubmitting }) => (
					<StyledForm autoComplete='off'>
						<NavBox>
							<Link to='/auth/register' end>
								Registration
							</Link>
							<Link to='/auth/login'>Log In</Link>
						</NavBox>

						<LabelBox>
							<FieldContainer>
								<StyledField
									name='name'
									type='text'
									placeholder='Enter your name'
								/>
								<ErrorMsg name='name' component='span' />
							</FieldContainer>
							<FieldContainer>
								<StyledField
									name='email'
									type='email'
									placeholder='Enter your email'
								/>
								<ErrorMsg name='email' component='span' />
							</FieldContainer>
							<FieldContainer>
								<StyledFieldContainer>
									<StyledField
										name='password'
										type={showPassword ? 'text' : 'password'}
										placeholder='Create a password'
									/>
									<IconHideShow
										name='hide-show'
										onClick={togglePasswordVisibility}
									>
										{showPassword ? 'Hide' : 'Show'}
									</IconHideShow>
								</StyledFieldContainer>

								<ErrorMsg name='password' component='span' />
							</FieldContainer>
						</LabelBox>

						<Button type='submit' disabled={isSubmitting}>
							<ButtonText>Register Now</ButtonText>
						</Button>
					</StyledForm>
				)}
			</Formik>
		</Container>
	);
};

export default RegisterForm;
