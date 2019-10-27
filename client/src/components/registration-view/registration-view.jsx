import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import './registration-view.scss'

export function RegistrationView(props){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthday);
		props.onLoggedIn(username);
	};

	return(
		<Container>
			<h3>Register</h3>
			<Form>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" placeholder="Username" />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Email" />
				</Form.Group>
				<Form.Group controlId="formBasicBirthday">
					<Form.Label>Birthday</Form.Label>
					<Form.Control type="date" placeholder="Birthday" />
				</Form.Group>
				<Button onClick={handleSubmit} variant="primary" type="submit">Register</Button>
			</Form>
		</Container>
	);
}
