import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';
import { useAlerts } from './hooks';
import { Drawer, Message } from '../ui';
import './alerts.css';

const Alerts = ({ authUser }) => {
  const { alerts } = useAlerts(authUser.uid);
  const [ message, setMessage] = useState(null);
  
  const dismiss = alertId => {
    db.deleteUserAlert(authUser.uid, alertId)
      .catch(error => setMessage({type: error, message: error.message}));
  }
  
  return (
    <div className="alerts">
      <Drawer trigger={
        <span className={`alerts-trigger ${(alerts && alerts.length) ? "alerts-trigger-flag" : ''}`}>
          <FontAwesomeIcon icon={faBell} />
        </span>
      }>
        {!!message && <Message type={message.type} message={message.message} />}
        {(alerts && alerts.length)
          ? alerts.map(alert => (
            <div className="alert-item" key={alert.id}>
              <Link
                to={alert.link}
                className={`alerts-alert alert-${alert.type}`}
              >
                {alert.message}
              </Link>
              <button onClick={() => dismiss(alert.id)}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
          )) : <p className="text-muted">You have no alerts at the moment.</p>
        }
      </Drawer>
    </div>
  )
}

export default Alerts;
