/** @format */

import * as Yup from 'yup';

const emailRegex = RegExp(/^[A-Z|a-z0-9!#$%&._%+-/=?^]+@[A-Z|a-z0-9.-]+\.[A-Z|a-z]{2,4}$/);

const passwordRegex = RegExp(/^[A-Z|a-z0-9!#$%&._%+-/=?^]{0,100}$/);

export const needHelpSchema = Yup.object().shape({
	email: Yup.string()
		.matches(emailRegex, 'Invalid email')
		.email('Invalid email address')
		.required('This is a required field'),
	comment: Yup.string().required('This is a required field'),
});

export const createBoardSchema = Yup.object().shape({
	name: Yup.string().required('This is a required field'),
	icon: Yup.string().required('This is a required field'),
	background: Yup.string().required('This is a required field'),
});

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

export const addCardValidationSchema = Yup.object().shape({
	name: Yup.string().required('Title is required'),
	text: Yup.string(),
	priority: Yup.string(),
	deadline: Yup.number(),
});

export const editProfilShema = Yup.object().shape({
	name: Yup.string().min(2, 'Too short!').max(32, 'Too Long!'),

	email: Yup.string().matches(emailRegex, 'Invalid email').email('Invalid email'),

	password: Yup.string()
		.matches(passwordRegex, 'Invalid password')
		.min(2, 'Too Short!')
		.max(64, 'Password should be of max 64 characters length'),
});

export const columnSchema = Yup.object().shape({
	name: Yup.string().required('name is required'),
});
