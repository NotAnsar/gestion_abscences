import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classes from './Prof.module.scss';
import url from '../../store/url';

const AddAbscence = () => {
	const [users, setusers] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const [done, setdone] = useState(false);
	useEffect(() => {
		async function getusers() {
			try {
				// const res = await fetch(`../../../json/users.json`, {
				const res = await fetch(`${url}/users`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				const data = (await res.json()).filter((u) => u.role === 'etudiant');

				setusers(data.map((d) => ({ ...d, checked: false })));
			} catch (error) {
				console.log(error);
				setusers(null);
			}
		}
		getusers();
	}, []);
	useEffect(() => {
		console.log(done);
		if (done) {
			navigate('/prof/seances', { state: { done: true } });
		}
	}, [done]);

	function handleChange(e) {
		const newArray = users.map((item, i) => {
			if (item.id === +e.target.value)
				return { ...item, checked: !item.checked };
			else return { ...item };
		});
		setusers(newArray);
	}
	function submit() {
		console.log('submit');
		const abs = users.filter((item) => item.checked === true);

		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		var curr_hour = d.getHours();

		const data = abs.map((a) => ({
			dateAbsence: `${[curr_date, curr_month + 1, curr_year].join(
				'/'
			)} ${curr_hour}:00`,
			etudiant: { id: a.id },
			justification: '',
			sceance: { id: +id },
			status: 'en attente',
		}));

		async function addAbs(dat, i, length) {
			try {
				let res = await fetch(`${url}/absences`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(dat),
				});

				const data = await res.json();
				// console.log(data);
				console.log(i === length - 1);
				if (i === length - 1) {
					setdone(true);
				}
			} catch (error) {
				setdone(false);
				console.log(error, i);
			}
		}

		try {
			data.forEach((data, i, a) => {
				addAbs(data, i, a.length);
			});
			console.log('done');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>Seances</h1>

				<div className={classes.pagination}>
					<p>Selectionner le checkbox si l'etudiant est absent</p>
				</div>
			</div>

			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Ajouter Abscence</th>
						<th>Id Etudiant</th>
						<th>Nom Etudiant </th>
						<th>Prenom Etudiant </th>
						{/* <th>Heure fin</th> */}
						{/* <th>Ajouter Abscences</th> */}
					</tr>
				</thead>
				<tbody>
					{users.map((s) => (
						<tr key={s.id}>
							<td>
								<input
									onChange={handleChange}
									type='checkbox'
									name='checked'
									value={s.id}
								/>
							</td>
							<td>{s.id}</td>
							<td>{s.nom}</td>
							<td>{s.prenom}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={classes.btn__container}>
				<Link to=''>
					<input
						className={classes.btn__primary}
						type='Submit'
						placeholder='Ajouter Abscence'
						onClick={submit}
						defaultValue='Ajouter Abscence'
					/>
				</Link>
			</div>
		</div>
	);
};

export default AddAbscence;
