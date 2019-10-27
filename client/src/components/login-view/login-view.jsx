import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import './login-view.scss'

export function LoginView(props){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onLoggedIn(username);
	};

	return(
		<Container>
			<h3>Log in</h3>
			<Form>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" placeholder="Username" />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button onClick={handleSubmit} variant="primary" type="submit">Login</Button>
			</Form>
		</Container>
	);
}