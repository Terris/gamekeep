import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withPermission } from '../../session';
import { ROUTES } from '../../../constants';
import { db } from '../../../firebase';
import { Message } from '../../ui';
import SelectPlayers from './SelectPlayers';
import './newgame.css';

const NewGame = ({ dbUser }) => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [ disable, setDisable ] = useState(false);
  const [ message, setMessage ] = useState(null);
  const [ players, setPlayers] = useState([]);
  
  const handleSelection = (selection) => {
    setPlayers(selection);
  } // lifted from <SelectPlayers />
  
  const handleSubmit = e => {
    e.preventDefault()
    if ( name === "") {
      setMessage({type: "error", message: "Game name is required"});
    } else {
      setDisable(true);
      let playersWithSelf = [dbUser.uid, ...players];
      db.createGame(dbUser.uid, name, playersWithSelf)
        .then(res => history.push(`${ROUTES.GAMES.path}/${res.id}`))
        .catch(error => setMessage({type: error, message: message.message}));
    }
  }
  
  return (
    <div className="newgame">
      <h2>New Game</h2>
      {message && <Message type={message.type} message={message.message} />}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Game Name'
            value={name}
            onChange={e => setName(e.currentTarget.value)} />
        </div>
        <SelectPlayers dbUser={dbUser} handleSelection={handleSelection} />
        <div className="field">
          <button type='submit' className="btn" disabled={disable}>Start Game</button>
        </div>
      </form>
    </div>
  )
}

const condition = authUser => !!authUser;
export default withPermission(condition)(NewGame);
