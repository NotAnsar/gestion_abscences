import React from 'react';
import classes from './Admin.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import url from '../../store/url';
import Alert from '../../assets/Alert';

const JustificationAbscences = () => {
	const [abscences, setAbscences] = useState([]);

	const dataInOnePage = 4;
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage,
		right: dataInOnePage,
		currentpage: 0,
		totalPage: 0,
	});

	const location = useLocation();

	const [alert, setIsAlertVisible] = useState(false);
	const showAlert = () => {
		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 3000);
	};

	function nextPage() {
		if (page.currentpage < page.totalPage) {
			setPage((prev) => ({
				...prev,
				left: (page.currentpage + 1) * page.dataInOnePage,
				right: (page.currentpage + 1) * page.dataInOnePage + page.dataInOnePage,
				currentpage: page.currentpage + 1,
			}));
		}
	}

	function previousPage() {
		if (page.currentpage > 0) {
			setPage((prev) => ({
				...prev,
				left: (page.currentpage - 1) * page.dataInOnePage,
				right: (page.currentpage - 1) * page.dataInOnePage + page.dataInOnePage,
				currentpage: page.currentpage - 1,
			}));
		}
	}

	useEffect(() => {
		if (location.state?.done) {
			showAlert();
		}
		async function getjustification() {
			try {
				// const res = await fetch('../../json/abscences.json', {
				const res = await fetch(`${url}/absencesEtudiants`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(data.length / page.dataInOnePage) - 1,
				}));

				setAbscences(data);
			} catch (error) {
				setAbscences(null);
			}
		}
		getjustification();
	}, []);

	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>Liste des Abscences</h1>
				<div className={classes.pagination}>
					<span
						className={page.currentpage === 0 ? classes.disabeled : ''}
						onClick={previousPage}
					>
						Previous
					</span>
					<span
						onClick={nextPage}
						className={
							page.currentpage === page.totalPage ? classes.disabeled : ''
						}
					>
						Next
					</span>
				</div>
			</div>
			{alert && <Alert msg={'Abscences Valider'} color='green' />}
			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Module</th>
						<th>Nom Etudiant</th>
						<th>Date De Seance</th>
						<th>Heure debut</th>
						<th>Heure fin</th>

						<th>Justification</th>
					</tr>
				</thead>
				<tbody>
					{abscences.slice(page.left, page.right).map((a) => {
						return (
							<tr key={a.id}>
								<td>{a.sceance?.cours?.nom}</td>

								<td>{`${a.etudiant.nom} ${a.etudiant.prenom}`}</td>
								<td>{a.sceance.dateSceance}</td>
								<td>{a.sceance.dateDebut.split(' ')[1]}</td>
								<td>{a.sceance.dateFin.split(' ')[1]}</td>

								<td>
									<Link to={`justification/${a.id}`}>
										<input
											type='Submit'
											placeholder='Voir Justification'
											defaultValue='Voir Justification'
										/>
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* <div className={classes.pagination}>
				<span>Previous</span>
				<span>Next</span>
			</div> */}
		</div>
	);
};

export default JustificationAbscences;
