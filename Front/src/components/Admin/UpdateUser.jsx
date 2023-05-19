import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './Admin.module.scss';
import formClasses from '../Login/Form.module.scss';
import url from '../../store/url';

const UpdateUser = () => {
	let { id } = useParams();
	const navigate = useNavigate();

	const [user, setUser] = useState({
		nom: '',
		prenom: '',
		email: '',
		role: '',
		age: '',

		tel: '',
		adresse: '',
		filiere: '',
		description: '',
	});

	useEffect(() => {
		async function getUser() {
			try {
				const res = await fetch(`${url}/users/${id}`, {
					// const res = await fetch('../../json/modules.json', {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				setUser(data);
			} catch (error) {
				console.log(error);
				setUser(null);
			}
		}
		getUser();
	}, []);

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		async function updateUser() {
			try {
				const res = await fetch(`${url}/users/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(user),
				});

				const data = await res.json();
				console.log(data);
				navigate('/admin', { state: { done: true, status: 'update' } });
			} catch (error) {
				console.log(error);
			}
		}
		updateUser();
	};

	return (
		<div className={classes.justification}>
			<h2>Modifier Utilisateur</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.blueForm}`}
				onSubmit={formHandler}
			>
				<div className={formClasses.splitFormBy3}>
					<div>
						<label htmlFor='nom'>Nom </label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={user.nom}
							name='nom'
						/>
					</div>
					<div>
						<label htmlFor='prenom'>Prenom</label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={user.prenom}
							name='prenom'
						/>
					</div>
					<div>
						<label htmlFor='age'>Age</label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={user.age}
							name='age'
						/>
					</div>
				</div>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							defaultValue={user.email}
							onChange={handleChange}
							name='email'
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
							required
						/>
					</div>

					<div>
						<label htmlFor='categorie_id'>role</label>
						<select
							name='role'
							onChange={handleChange}
							className={formClasses.select}
							value={user.role}
						>
							<option key={0} value={'etudiant'}>
								etudiant
							</option>
							<option key={1} value={'prof'}>
								prof
							</option>
							<option key={2} value={'admin'}>
								admin
							</option>
						</select>
					</div>
				</div>

				<div className={formClasses.splitFormBy3}>
					<div>
						<label htmlFor='tel'>Tel </label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={user.tel}
							name='tel'
						/>
					</div>
					<div>
						<label htmlFor='adresse'>Adresse</label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={user.adresse}
							name='adresse'
						/>
					</div>
					<div>
						<label htmlFor='filiere'>Filiere</label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={user.filiere}
							name='filiere'
						/>
					</div>
				</div>

				<div>
					<label htmlFor='description'>Description</label>
					<textarea
						className={formClasses.textarea}
						defaultValue={user.description}
						onChange={handleChange}
						name='description'
					/>
				</div>

				<div>
					<input type='Submit' defaultValue='Modifier Utilisateur' />
				</div>
			</form>
		</div>
	);
};

export default UpdateUser;
