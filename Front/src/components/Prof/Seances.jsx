import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Prof.module.scss';
import url from '../../store/url';
import { useSelector } from 'react-redux';
import Alert from '../../assets/Alert';

const Seances = () => {
	const { user } = useSelector((state) => state.auth);

	const [seance, setseance] = useState([]);
	const dataInOnePage = 6;
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
		console.log('foo');
		if (location.state?.done) {
			showAlert();
		}

		async function getSeance() {
			try {
				// const res = await fetch(`../../../json/users.json`, {
				const res = await fetch(`${url}/sceances`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				// const data = (await res.json()).filter((u) => u.id !== user.id);
				const data = (await res.json()).filter(
					(u) => u.cours.prof.id === user.id
				);

				// console.log(data[0]);

				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(data.length / page.dataInOnePage) - 1,
				}));

				setseance(data);
			} catch (error) {
				console.log(error);
				setseance(null);
			}
		}
		getSeance();
	}, []);

	return (
		<Fragment>
			<div className={classes.abscences}>
				<div className={classes.title_container}>
					<h1>Seances</h1>

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
				{alert && <Alert msg={'Abscences Ajouter'} color='green' />}
				<table className={classes.styled_table}>
					<thead>
						<tr>
							<th>Id Seance</th>
							<th>Module</th>
							<th>Date De Seance</th>
							<th>Heure debut</th>
							<th>Heure fin</th>
							<th>Ajouter Abscences</th>
						</tr>
					</thead>
					<tbody>
						{seance.slice(page.left, page.right).map((s) => (
							<tr key={s.id}>
								<td>{s.id}</td>
								<td>{s.cours.nom}</td>
								<td>{s.dateSceance}</td>

								<td>{s.dateDebut.split(' ')[1]}</td>
								<td>{s.dateFin.split(' ')[1]}</td>
								<td>
									<Link to={`abscences/${s.id}`}>
										<input
											type='button'
											defaultValue='Ajouter Abscences'
											// className={classes.btn__black}
										/>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* <div className={classes.pagination}>
    <span>Previous</span>
    <span>Next</span>
  </div> */}
			</div>
		</Fragment>
	);
};

export default Seances;
