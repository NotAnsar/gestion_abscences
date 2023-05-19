import React, { Fragment, useEffect, useState } from 'react';

import classes from './Etudiant.module.scss';
import { HiOutlineDocumentText } from 'react-icons/hi';
import url from '../../store/url';
const Cours = () => {
	const [cours, setcours] = useState([]);

	const [n, setN] = useState(false);

	function showAll() {
		setN((d) => !d);
	}

	useEffect(() => {
		async function getAbscences() {
			try {
				console.log(`${url}/cours`);
				const res = await fetch(`${url}/cours`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				console.log(data);

				setcours(data);
			} catch (error) {
				console.log(error);
				setcours(null);
			}
		}
		getAbscences();
	}, []);

	return (
		<Fragment>
			<h1>Mes Cours</h1>
			<div>
				<div className={classes.cours_container}>
					{cours.map((d, i) => (
						<div key={i}>
							<HiOutlineDocumentText />
							<h3>{d.NomCours}</h3>
							<div>enseigné par</div>
							<p>{`${d.NomProf} ${d.PrenomProf}`}</p>
						</div>
					))}
				</div>
				{/* {cours.length >= 5 && (
					<div className={classes.btn_container}>
						<input
							type='button'
							defaultValue={`${n ? 'Show less' : 'Tout les cours'}`}
							onClick={showAll}
						/>
					</div>
				)} */}
			</div>
		</Fragment>
	);
};

export default Cours;
