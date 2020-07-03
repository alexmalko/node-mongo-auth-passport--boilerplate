import axios from 'axios';

// register a user function
export const register = async (name, email, password) => {
	const newUser = {
		name,
		email,
		password
	};

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(newUser);

	const res = await axios.post('/api/users', body, config);
	console.log(res.data);
};
