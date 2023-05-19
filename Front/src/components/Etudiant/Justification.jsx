import React, { useEffect, useState } from 'react';

import classes from './Etudiant.module.scss';

import formClasses from '../Login/Form.module.scss';
import { json, useNavigate, useParams } from 'react-router-dom';
import url from '../../store/url';
import { useSelector } from 'react-redux';
const Justification = () => {
	let { id } = useParams();
	const navigate = useNavigate();

	const [justification, setJustification] = useState('');
	const { user } = useSelector((state) => state.auth);

	const [abscences, setAbscences] = useState({
		date_Seance: '',
		heure_debut: '',
		heure_fin: '',
		id: NaN,
		module: '',
		status: '',
		justification: '',
	});

	useEffect(() => {
		async function getAbscences() {
			try {
				// const res = await fetch('../../../json/abscences.json', {
				const res = await fetch(`${url}/absencesEtudiants`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				const user = data.find((a) => a.id === +id);

				setAbscences((a) => {
					return {
						date_Seance: user.sceance.dateSceance,
						justification: user.justification,
						heure_debut: user.sceance.dateDebut.split(' ')[1],
						heure_fin: user.sceance.dateFin.split(' ')[1],
						id: user.id,
						module: user.sceance.cours.name,
						status: user.status,
					};
				});
			} catch (error) {
				setAbscences(null);
			}
		}
		getAbscences();
	}, []);

	if (abscences === null) {
		navigate('/etudiant');
	}

	const handleChange = (e) => {
		let value = e.target.value;
		setJustification(value);
	};

	const formHandler = (e) => {
		//localhost:8084/api/v1/absencesEtudiants/4
		http: e.preventDefault();
		console.log({
			justification: justification,
			status: abscences.status,
		});
		async function updateAbscences() {
			try {
				// const res = await fetch('../../../json/abscences.json', {
				const res = await fetch(`${url}/absencesEtudiants/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						justification: justification,
						status: abscences.status,
					}),
				});

				const data = await res.json();
				console.log(data);

				navigate('/etudiant', { state: { done: true } });
			} catch (error) {
				setAbscences(null);
			}
		}
		updateAbscences();
	};

	return (
		<div className={classes.justification}>
			<h2>Ajouter Justification</h2>
			{/* <div className={classes.justification_container}>
				<div>
					<ul>
						<li>Module :</li>
						<li>Developement</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>Prof de Module :</li>
						<li>Hajar Lazar</li>
					</ul>
				</div>

				<div>
					<ul>
						<li>Date Seance :</li>
						<li>Developement</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>Heure Debut :</li>
						<li>16:00</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>Heure Fin :</li>
						<li>16:00</li>
					</ul>
				</div>
			</div> */}
			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.blueForm}`}
				onSubmit={formHandler}
			>
				{/* <form id='checkoutForm' onSubmit={formHandler}> */}
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='firstName'>Nom de Module </label>
						<input
							type='text'
							// onChange={handleChange}
							value={abscences.module}
							name='module'
							disabled
						/>
					</div>
					<div>
						<label htmlFor='lastName'>Prof de Module</label>
						<input
							type='text'
							// onChange={handleChange}
							value='Hazar Lazar'
							name='prof'
							disabled
						/>
					</div>
				</div>
				<div className={formClasses.splitFormBy3}>
					<div>
						<label htmlFor='email'>Date de Seance</label>
						<input
							type='text'
							// onChange={handleChange}
							value={abscences.date_Seance}
							name='email'
							disabled
						/>
					</div>
					<div>
						<label htmlFor='email'>Heure de Debut</label>
						<input
							type='text'
							// onChange={handleChange}
							value={abscences.heure_debut}
							name='email'
							disabled
						/>
					</div>
					<div>
						<label htmlFor='email'>Heure de Fin</label>
						<input
							type='text'
							// onChange={handleChange}
							value={abscences.heure_fin}
							name='email'
							disabled
						/>
					</div>
				</div>

				<div>
					<label htmlFor='email'>Justification</label>
					<textarea
						className={formClasses.textarea}
						name='justification'
						defaultValue={abscences.justification}
						onChange={handleChange}
					/>
				</div>

				<div>
					<input type='Submit' defaultValue='Add' />
				</div>
			</form>
		</div>
	);
};

export default Justification;
