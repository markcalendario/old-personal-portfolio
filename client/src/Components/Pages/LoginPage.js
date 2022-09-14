import React, { Fragment } from 'react';
import Footer from '../Shards/Footer';
import { PrimaryNavbar } from '../Shards/Navbar';
import { Section, Container, Wrapper } from '../Shards/Base';
import { Button } from '../Shards/Buttons';

export default function LoginPageCompile() {
	return (
		<Fragment>
			<PrimaryNavbar backgroundEnabled />
			<LoginPage />
			<Footer />
		</Fragment>
	);
}

function LoginPage() {
	const handleLoginClick = (evt) => {
		evt.preventDefault();

		const password = document.getElementById('at-password').value;
		const config = {
			method: 'POST',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password: password,
			}),
		};

		fetch(process.env.REACT_APP_API_URL + '/admin/login', config)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (!response.error) {
					window.location.href = "/admin"
				} else {
					alert("Wrong password.");
				}
			});
	};

	return (
		<Section id='login-page'>
			<Container>
				<Wrapper>
					<form>
						<div className='image'>
							<img
								src={require('../../Images/kenneth-logo-black.png').default}
								alt='Kenneth'
							/>
						</div>
						<h3>Administration Tool</h3>
						<input id='at-password' type='password' />
						<Button click={handleLoginClick} pigment='solid-stable-btn'>
							Sign In
						</Button>
					</form>
				</Wrapper>
			</Container>
		</Section>
	);
}
