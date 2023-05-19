import React, { useEffect, useState } from 'react';

import classes from './Admin.module.scss';
import formClasses from '../Login/Form.module.scss';
import url from '../../store/url';
import { useNavigate } from 'react-router-dom';

const AddModule = () => {
	const [formData, setFormData] = useState({
		nom: '',
		id: NaN,
	});

	const [prof, setprof] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function getProf() {
			try {
				// const res = await fetch('../../../json/modules.json', {
				const res = await fetch(`${url}/users`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				setprof(data.filter((u) => u.role === 'prof'));
				setFormData((prev) => ({
					...prev,
					id: data.filter((u) => u.role === 'prof')[0].id,
				}));
			} catch (error) {
				console.log(error);
				setprof(null);
			}
		}
		getProf();
	}, []);

	const formHandler = (e) => {
		e.preventDefault();

		console.log({ id: formData.id, nom: formData.nom });
		async function addModule() {
			try {
				const res = await fetch(`${url}/cours`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({ id: formData.id, nom: formData.nom }),
				});

				const data = await res.json();

				console.log(data);

				navigate('/admin/modules', { state: { done: true, status: 'add' } });
			} catch (error) {
				console.log(error);
			}
		}

		addModule();
	};
	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={classes.justification}>
			<h2>Modifier Module</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.greenForm}`}
				onSubmit={formHandler}
			>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='module'>Nom Module </label>
						<input onChange={handleChange} type='text' name='nom' />
					</div>

					<div>
						<label htmlFor='categorie_id'>Prof</label>
						{!isNaN(prof[0]?.id) && (
							<select
								name='id'
								onChange={handleChange}
								className={formClasses.select}
								defaultValue={prof[0]?.id}
							>
								{prof.map((a, y) => (
									<option key={y} value={a.id}>
										{`${a.nom} ${a.prenom}`}
									</option>
								))}
							</select>
						)}
					</div>
				</div>

				<div>
					<input type='Submit' defaultValue='Modifier Module' />
				</div>
			</form>
		</div>
	);
};

export default AddModule;
