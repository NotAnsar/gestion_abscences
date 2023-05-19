import React, { useEffect, useState } from 'react';
import classes from './Prof.module.scss';
import url from '../../store/url';
import { useSelector } from 'react-redux';

const ListAbscences = () => {
	const { user } = useSelector((state) => state.auth);
	const [abscence, setabscence] = useState([]);
	const dataInOnePage = 6;
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage,
		right: dataInOnePage,
		currentpage: 0,
		totalPage: 0,
	});

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
		async function getAbscence() {
			try {
				// const res = await fetch(`../../../json/users.json`, {
				const res = await fetch(`${url}/absencesEtudiants`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				// const data = (await res.json()).filter((u) => u.id !== user.id);
				const data = await res.json();
				console.log(data);
				const abs = data.filter((u) => u.sceance.cours.prof.id === user.id);
				console.log(abs);

				console.log(abs[0]);
				console.log(abs[0].sceance.cours.nom);
				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(data.length / page.dataInOnePage) - 1,
				}));

				setabscence(abs);
			} catch (error) {
				console.log(error);
				setabscence(null);
			}
		}
		getAbscence();
	}, []);
	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>List des Abscences</h1>

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
			{/* <div className={classes.sortBy}>
					Choisir Module
					<select
						defaultValue={''}
						// onChange={handleChange}
						className={classes.sort}
					>
						<option value=''>Module</option>
						<option value='name asc'>Developement Web</option>
						<option value='name desc'>Réseaux</option>
						<option value='price asc'>Uml</option>
					</select>
				</div>
			</div> */}

			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Module</th>
						<th>Id Etudiant</th>
						<th>Nom Etudiant</th>

						<th>Date De Seance</th>
						<th>Heure debut</th>
						<th>Heure fin</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{abscence.slice(page.left, page.right).map((s) => (
						<tr key={s.id}>
							<td>{s.sceance.cours.nom}</td>
							<td>{s.etudiant.id}</td>
							<td>{`${s.etudiant.nom} ${s.etudiant.prenom}`}</td>

							<td>{s.sceance.dateSceance}</td>
							<td>{s.sceance.dateDebut.split(' ')[1]}</td>
							<td>{s.sceance.dateFin.split(' ')[1]}</td>
							<td>{s.status}</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* <div className={classes.pagination}>
				<span>Previous</span>
				<span>Next</span>
			</div> */}
		</div>
	);
};

export default ListAbscences;
