/** @format */

import * as Yup from 'yup';

const emailRegex = RegExp(/^[A-Z|a-z0-9!#$%&._%+-/=?^]+@[A-Z|a-z0-9.-]+\.[A-Z|a-z]{2,4}$/);

const passwordRegex = RegExp(/^[A-Z|a-z0-9!#$%&._%+-/=?^]{0,100}$/);

export const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.matches(emailRegex, 'Invalid email')
		.email('Invalid email address')
		.required('This is a required field'),
	password: Yup.string()
		.required('This is a required field')
		.matches(passwordRegex, 'Invalid password'),
});

export const RegisterSchema = Yup.object().shape({
	name: Yup.string().trim().min(2, 'Too Short!').required('This is a required field'),
	email: Yup.string()
		.matches(emailRegex, 'Invalid email')
		.email('Invalid email address')
		.required('This is a required field'),
	password: Yup.string()
		.min(6, 'Too Short!')
		.matches(passwordRegex, 'Invalid password')
		.required('This is a required field'),
});
