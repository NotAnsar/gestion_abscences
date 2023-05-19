import React, { Fragment, useEffect, useState } from 'react';

import classes from './Prof.module.scss';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import url from '../../store/url';
import { useSelector } from 'react-redux';
const MesModules = () => {
	const { user } = useSelector((state) => state.auth);
	const [cours, setcours] = useState([]);

	const [n, setN] = useState(false);

	function showAll() {
		setN((d) => !d);
	}

	useEffect(() => {
		async function getAbscences() {
			try {
				const res = await fetch(`${url}/cours`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = (await res.json()).filter((a) => user.id === a.IdProf);

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
							{/* <div className={classes.buttonContainer}>
								<Link to={`seances/${i}`}>
									<input
										type='button'
										defaultValue='Liste Seances'
										className={classes.btn__black}
									/>
								</Link>
								<Link to={`etudiants/${i}`}>
									<input
										type='button'
										defaultValue='Liste Etudiants'
										className={classes.btn__primary}
									/>
								</Link>
							</div> */}
						</div>
					))}
				</div>
				{/* <div className={classes.btn_container}>
					<input
						type='button'
						defaultValue={`${n ? 'Show less' : 'Tout les cours'}`}
						onClick={showAll}
					/>
				</div> */}
			</div>
		</Fragment>
	);
};

export default MesModules;
