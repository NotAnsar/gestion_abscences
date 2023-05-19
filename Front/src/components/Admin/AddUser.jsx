import React from 'react';
import classes from './Admin.module.scss';

import formClasses from '../Login/Form.module.scss';
import { useState } from 'react';
import url from '../../store/url';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		nom: '',
		prenom: '',
		age: '',
		email: '',
		role: 'etudiant',
		tel: '',
		adresse: '',
		filiere: '',
		description: '',
		password: '',
	});

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		console.log(user);
		async function updateUser() {
			try {
				const res = await fetch(`${url}/users`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(user),
				});

				const data = await res.json();
				console.log(data);
				// navigate('/admin');
				navigate('/admin', { state: { done: true, status: 'add' } });
			} catch (error) {
				console.log(error);
			}
		}
		updateUser();
	};
	return (
		<div className={classes.justification}>
			<h2>Ajouter Utilisateur</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.greenForm}`}
				onSubmit={formHandler}
			>
				<div className={formClasses.splitFormBy3}>
					<div>
						<label htmlFor='nom'>Nom </label>
						<input type='text' name='nom' onChange={handleChange} />
					</div>
					<div>
						<label htmlFor='prenom'>Prenom</label>
						<input type='text' name='prenom' onChange={handleChange} />
					</div>
					<div>
						<label htmlFor='age'>Age</label>
						<input type='text' name='age' onChange={handleChange} />
					</div>
				</div>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
							required
							onChange={handleChange}
						/>
					</div>

					<div>
						<label htmlFor='password'>password</label>
						<input type='password' name='password' onChange={handleChange} />
					</div>
				</div>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='categorie_id'>role</label>
						<select
							name='role'
							className={formClasses.select}
							onChange={handleChange}
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
					<div>
						<label htmlFor='filiere'>Filiere</label>
						<input type='text' name='filiere' onChange={handleChange} />
					</div>
				</div>

				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='tel'>Tel </label>
						<input type='text' name='tel' onChange={handleChange} />
					</div>
					<div>
						<label htmlFor='adresse'>Adresse</label>
						<input type='text' name='adresse' onChange={handleChange} />
					</div>
				</div>

				<div>
					<label htmlFor='description'>Description</label>
					<textarea
						className={formClasses.textarea}
						name='description'
						onChange={handleChange}
					/>
				</div>

				<div>
					<input type='Submit' defaultValue='Ajouter Utilisateur' />
				</div>
			</form>
		</div>
	);
};

export default AddUser;
