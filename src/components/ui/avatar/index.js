import React from 'react';
import './avatar.css';

const Avatar = ({ src, alt, wrapperClass }) => (
  <figure className={wrapperClass}><img src={src} alt={alt} className="avatar" /></figure>
);

export default Avatar;
