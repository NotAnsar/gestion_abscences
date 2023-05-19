import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Login } from '../../store/authSlice';
import fssmLogo from '../../assets/fssm.png';

import classes from './Form.module.scss';
const LoginForm = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });

	const {
		loggedIn,
		user: { role },
		error,
	} = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	let navigate = useNavigate();

	useEffect(() => {
		if (loggedIn) {
			if (role === 'etudiant') {
				navigate('/etudiant');
			}
			if (role === 'prof') {
				navigate('/prof');
			}
			if (role === 'admin') {
				navigate('/admin');
			}
		}
	}, [loggedIn]);

	const formHandler = (e) => {
		e.preventDefault();
		if (!formData.email.includes('@') || !formData.password.length > 4) return;

		// console.log(formData.email + ' ' + formData.password);

		dispatch(Login(formData.email, formData.password));
	};
	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	return (
		<div className={classes.login}>
			<div className={classes.container}>
				{/* {errorr.error && <p className={classes.alert}>{errorr.message}.</p>} */}
				{error && (
					<p className={classes.alert}>Login Or Password Are Incorrect</p>
				)}

				<div className={classes.form}>
					<form onSubmit={formHandler}>
						<img src={fssmLogo} className={classes.logo} />
						<br />
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							name='email'
							onChange={handleChange}
							value={formData.email}
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
							required
						/>
						<label htmlFor='password'>Mot de passe</label>
						<input
							type='password'
							name='password'
							minLength='6'
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<input
							type='Submit'
							placeholder='Connexion'
							defaultValue='Connexion'
						/>
					</form>
					{/* <div className={classes.newUser}>
						<Link to='/register'>New User ?</Link>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
