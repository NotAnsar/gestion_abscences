import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Admin.module.scss';
import { Fragment } from 'react';
import url from '../../store/url';

const Justification = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const [abscence, setAbscence] = useState({
		id,
		module: '',
		date_Seance: '',
		heure_debut: '',
		nom_Etudiant: '',
		heure_fin: '',
		status: '',
		justification: '',
	});
	// console.log(abscence);

	function validerAbscence(a) {
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
						justification: abscence.justification,
						status: a ? 'Justifié' : 'non Justifié',
					}),
				});

				const data = await res.json();
				console.log(data);
				navigate('/admin/abscences', { state: { done: true } });
			} catch (error) {
				console.log(error);
			}
		}
		updateAbscences();
	}

	useEffect(() => {
		async function getmodules() {
			try {
				const res = await fetch(`${url}/absencesEtudiants`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();
				const abs = data.find((a) => a.id === +id);
				console.log(abs);
				setAbscence({
					id,
					module: abs.sceance.cours.nom,
					date_Seance: abs.sceance.dateSceance,
					heure_debut: abs.sceance.dateDebut.split(' ')[1],
					nom_Etudiant: `${abs.etudiant.nom} ${abs.etudiant.prenom}`,
					heure_fin: abs.sceance.dateFin.split(' ')[1],
					status: abs.status,
					justification: abs.justification,
				});
			} catch (error) {
				setAbscence(null);
			}
		}
		getmodules();
	}, []);

	return (
		<Fragment>
			<h1>Validation D'abscence</h1>

			<div className={classes.validation_container}>
				<div className={classes.split2}>
					<div>
						<h3>Nom Etudiant </h3>
						<p>Ansar Karrouach</p>
					</div>
					<div>
						<h3>Nom De module </h3>
						<p>{abscence.module}</p>
					</div>
				</div>
				<div className={classes.split3}>
					<div>
						<h3>Date de Seance</h3>
						<p>{abscence.date_Seance}</p>
					</div>
					<div>
						<h3>Heure de Debut</h3>
						<p>{abscence.heure_debut}</p>
					</div>
					<div>
						<h3>Heure de Fin</h3>
						<p>{abscence.heure_fin}</p>
					</div>
				</div>
				<div>
					<h3>Justification</h3>
					<p>{abscence.justification}</p>
				</div>
				<div>
					<h3>Valider Abscences</h3>
					<div>
						<input
							className={classes.btn__green}
							type='button'
							onClick={() => validerAbscence(true)}
							placeholder='Update'
							// defaultValue='Valider'
							defaultValue='&#10003;'
						/>
						<input
							type='button'
							className={classes.btn__red}
							onClick={() => validerAbscence(false)}
							placeholder='Update'
							// defaultValue='Non Valider'
							defaultValue='&#10005;'
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Justification;
