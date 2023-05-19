import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Prof.module.scss';

const ListEtudiants = () => {
	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>Seances</h1>

				<div className={classes.pagination}>
					<span className={classes.disabeled}>Previous</span>
					<span>Next</span>
				</div>
			</div>

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
					<tr>
						<td>1</td>
						<td>Developement Web</td>
						<td>12 septembre</td>
						<td>10h:00</td>
						<td>12h:00</td>
						<td>
							<Link to={`seances/${i}`}>
								<input
									type='button'
									defaultValue='Liste Seances'
									className={classes.btn__black}
								/>
							</Link>
						</td>
					</tr>
				</tbody>
			</table>
			{/* <div className={classes.pagination}>
    <span>Previous</span>
    <span>Next</span>
  </div> */}
		</div>
	);
};

export default ListEtudiants;
