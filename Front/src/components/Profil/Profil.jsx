import React, { Fragment } from 'react';

import { AiOutlineUser } from 'react-icons/ai';

import { useSelector } from 'react-redux';
import LeftProfil from './LeftProfil';
import classes from './Profil.module.scss';
import RightProfil from './RightProfil';
const Profil = () => {
	const { user } = useSelector((state) => state.auth);

	console.log(user);
	return (
		<Fragment>
			<h1>Mon Profil</h1>
			<div className={classes.container}>
				<LeftProfil user={user} />
				<RightProfil user={user} />
			</div>
		</Fragment>
	);
};

export default Profil;
