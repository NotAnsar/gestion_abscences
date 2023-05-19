import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../store/url';

const DeleteUser = () => {
	let { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function deleteusers() {
			try {
				// const res = await fetch(`../../../json/users.json`, {
				const res = await fetch(`${url}/users/${id}`, {
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				const data = await res.json();
				navigate('/admin', { state: { done: true, status: 'delete' } });
			} catch (error) {
				console.log(error);
			}
		}
		deleteusers();
	}, []);

	return <div></div>;
};

export default DeleteUser;
