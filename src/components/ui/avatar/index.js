import React from 'react';
import './avatar.css';

const Avatar = ({ user, wrapperClass, size }) => (
  <figure className={`avatar-wrapper ${wrapperClass ? wrapperClass : ''} ${size ? "avatar-" + size : ''}`}>
    {user.photoURL
      ? (<img src={user.photoURL} alt={`${user.displayName}'s Avatar'`} className="avatar" />)
      : (<span className="avatar-text">{`${user.displayName.charAt(0)}`}</span>)
    }
  </figure>
);

export default Avatar;
