import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import './loader.css';

const Loader = () => (
  <div className="loader">
    <div className="loader-icon">
      <FontAwesomeIcon icon={faCircleNotch} />
    </div>
  </div>
);

export default Loader;
