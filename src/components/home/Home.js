import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthUserContext } from '../session';
import { ROUTES } from '../../constants';
import './home.css';

const HomePage = () => {
	return (
		<div data-testid="page-home">
			<div className="hero">
				<div className="hero-alpha">
					<h2>Welcome to GameKeep!</h2>
					<p>Keep track of your game scores in real-time from from anywhere.</p>
				</div>
				<div className="hero-beta">
					<figure>
						<img src="/img/playing_cards.svg" alt="playing cards" />
					</figure>
				</div>
			</div>
		</div>
	);
};

const Home = () => {
	const { authUser } = useAuthUserContext();

	return <Fragment>{authUser ? <Redirect to={ROUTES.DASHBOARD.path} /> : <HomePage />}</Fragment>;
};

export default Home;
