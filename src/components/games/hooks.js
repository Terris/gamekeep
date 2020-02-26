import { useState, useEffect } from 'react';
import { db } from '../../firebase';

export const useGames = (uid) => {
	const [ loading, setLoading ] = useState(true);
	const [ games, setGames ] = useState([]);

	useEffect(
		() => {
			const unsubscribe = db.games(uid).onSnapshot((snapshot) => {
				const newGames = snapshot.docs.map((game) => ({
					id: game.id,
					...game.data()
				}));
				setGames(newGames);
				setLoading(false);
			});
			return () => unsubscribe();
		},
		[ uid ]
	);
	return { games, loading };
};

export const useGame = (id) => {
	const [ loading, setLoading ] = useState(true);
	const [ game, setGame ] = useState([]);

	useEffect(
		() => {
			const unsubscribe = db.game(id).onSnapshot((doc) => {
				setGame(doc.data());
				setLoading(false);
			});
			return () => unsubscribe();
		},
		[ id ]
	);

	return { game, loading };
};

export const usePlayers = (gamePlayers) => {
	const [ players, setPlayers ] = useState([]);
	useEffect(
		() => {
			setPlayers([]);
			gamePlayers.forEach((player) => {
				db.user(player).get().then((doc) => {
					let pData = doc.data();
					setPlayers((p) => [ ...p, pData ]);
				});
			});
		},
		[ gamePlayers ]
	);
	return { players };
};

export const usePlayerScores = (gameId, playerId) => {
	const [ scores, setScores ] = useState([]);
	const [ scoreTotal, setScoreTotal ] = useState(0);
	useEffect(
		() => {
			const unsubscribe = db.gamePlayerScores(gameId, playerId).onSnapshot((doc) => {
				if (doc.data()) {
					setScores(doc.data().scores);
					let newScoreTotal = 0;
					doc.data().scores.forEach((score) => {
						newScoreTotal = newScoreTotal + score;
					});
					setScoreTotal(newScoreTotal);
				}
			});
			return () => unsubscribe();
		},
		[ gameId, playerId ]
	);
	return { scores, scoreTotal };
};
