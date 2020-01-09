import React from 'react';
import './avatar.css';

const Avatar = ({ dbUser, wrapperClass, size }) => (
  <figure className={`avatar-wrapper ${wrapperClass ? wrapperClass : ''} ${size ? "avatar-" + size : ''}`}>
    {dbUser.photoURL
      ? (<img src={dbUser.photoURL} alt={`${dbUser.displayName}'s Avatar'`} className="avatar" />)
      : (<span className="avatar-text">{`${dbUser.displayName.charAt(0)}`}</span>)
    }
  </figure>
);

export default Avatar;
