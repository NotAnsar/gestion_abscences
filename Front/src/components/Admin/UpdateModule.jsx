import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './Admin.module.scss';
import formClasses from '../Login/Form.module.scss';
import url from '../../store/url';

const UpdateModule = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [module, setModule] = useState({
		id,
		nom: '',
		idProf: NaN,
		nomPro: '',
		prenomPro: '',
	});

	const [prof, setprof] = useState([]);

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
			} catch (error) {
				console.log(error);
				setprof(null);
			}
		}
		async function getModule() {
			try {
				// const res = await fetch('../../../json/modules.json', {
				const res = await fetch(`${url}/cours/${id}`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				// setModules(data);
				setModule({
					id: data.id,
					nom: data.nom,
					idProf: data.prof.id,
					nomPro: data.prof.nom,
					prenomPro: data.prof.prenom,
				});
			} catch (error) {
				console.log(error);
				// setModules(null);
			}
		}

		getProf();
		getModule();
	}, []);

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setModule((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		async function updateModule() {
			try {
				const res = await fetch(`${url}/cours/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						id: module.idProf,
						nom: module.nom,
					}),
				});

				const data = await res.json();

				console.log(data);
				console.log('done');

				navigate('/admin/modules', { state: { done: true, status: 'update' } });
			} catch (error) {
				console.log(error);
			}
		}

		updateModule();
	};

	return (
		<div className={classes.justification}>
			<h2>Modifier Module</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.blueForm}`}
				onSubmit={formHandler}
			>
				{/* {!isNaN(module.id) && modules.length > 0 && ( */}
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='nom'>Nom Module </label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={module.nom}
							name='nom'
						/>
					</div>

					<div>
						<label htmlFor='categorie_id'>Prof</label>
						{!isNaN(module.idProf) && (
							<select
								name='idProf'
								onChange={handleChange}
								className={formClasses.select}
								defaultValue={module.idProf}
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

export default UpdateModule;
