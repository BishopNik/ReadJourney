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
		.min(6, 'Too Short!')
		.required('This is a required field')
		.matches(passwordRegex, 'Enter a valid Password*'),
});

export const RegisterSchema = Yup.object().shape({
	name: Yup.string().trim().min(2, 'Too Short!').required('This is a required field'),
	email: Yup.string()
		.matches(emailRegex, 'Invalid email')
		.email('Invalid email address')
		.required('This is a required field'),
	password: Yup.string()
		.min(6, 'Too Short!')
		.required('This is a required field')
		.matches(passwordRegex, 'Enter a valid Password*'),
});

export const AddBookSchema = Yup.object().shape({
	title: Yup.string().trim().min(2, 'Too Short!').required('This is a required field'),
	author: Yup.string().trim().min(2, 'Too Short!').required('This is a required field'),
	totalPages: Yup.number()
		.min(1, 'Should be greater than 0')
		.required('This is a required field'),
});

export const StartStopSchema = Yup.object().shape({
	page: Yup.number().min(1, 'Should be greater than 0').required('This is a required field'),
});
