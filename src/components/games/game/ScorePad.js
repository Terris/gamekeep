import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../../firebase';
import { Message } from "../../ui";
import './css/scorepad.css';

const scoreBtns = [9,8,7,6,5,4,3,2,1,0];

const ScorePad = ({ gameId, playerId, closeScorePad }) => {
  const [message, setMessage] = useState(null);
  const [sign, setSign] = useState("+");
  const [score, setScore] = useState("0")
  
  const updateScore = (n) => {
    n = n.toString();
    setScore(s => (s === "0") ? n : s + n);
  }
  
  const backspace = () => {
    if (score.length > 1) {
      setScore(s => s.toString().slice(0, -1))
    } else {
      setScore("0");
    }
  }
  
  const commitPlayerScore = () => {
    db.addGameScore(gameId, playerId, parseInt(sign + score))
      .then(() => closeScorePad())
      .catch(error => setMessage({type: "error", message: error.message}))
  }
  
  return (
    <div className="scorepad">
      <button
        className="close-scorepad-btn"
        onClick={() => closeScorePad()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="scorepad-inner">
        {message && <Message type={message.type} message={message.message} />}
        <input
          type="text"
          name="score"
          id="score"
          className="scorepad-input"
          placeholder='0'
          value={`${sign} ${score}`}
          disabled />
        <div className="scorepad-numbers">
          {scoreBtns.map(btn => (
            <button
              key={`scorepad-btn-${btn}`}
              className={`scorepad-btn scorepad-btn-${btn}`}
              onClick={() => updateScore(btn)}>
              {btn}
            </button>
          ))}
        </div>
        <div className="scorepad-operations">
          <button
            className="scorepad-btn scorepad-btn-del"
            onClick={() => backspace()}>
            del
          </button>
          <button
            className={`scorepad-btn scorepad-btn-sign-plus ${sign === "+" ? "active" : ""}`}
            onClick={() => setSign("+")}>
            +
          </button>
          <button
            key="scorepad-btn-sign-minus"
            className={`scorepad-btn scorepad-btn-sign-minus ${sign === "-" ? "active" : ""}`}
            onClick={() => setSign("-")}>
            -
          </button>
          <button
            key="scorepad-btn-submit"
            className={`scorepad-btn scorepad-btn-submit`}
            onClick={() => commitPlayerScore()}>
            submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScorePad;
