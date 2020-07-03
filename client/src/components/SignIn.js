import React, { useState } from 'react';
import { register } from '../actions/auth';

export default function SignIn() {
	const [ formData, setFormData ] = useState({
		email: 'hellow@gmail.com',
		password: '123456789',
		name: 'hello'
	});

	const { name, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		register(name, email, password);
	};

	return (
		<div>
			<div>
				<h1>Sign up to CPE tracking website</h1>
			</div>
			<div className="App">
				<li>
					<a href="http://localhost:5000/auth/google">Login with Google</a>
				</li>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
						required
						minLength="6"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={onChange}
					/>
					<button>Sign up</button>
				</form>
			</div>
			<div className="App">
				<form action="">
					<input type="email" placeholder="Email Address" />
					<input type="password" placeholder="Password" />
					<button>Sign in</button>
				</form>
			</div>
		</div>
	);
}
