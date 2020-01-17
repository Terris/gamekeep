import React, { useState } from 'react';
import './checkbox.css';

const Checkbox = ({ initChecked }) => {
  const [checked, setChecked] = useState(initChecked);
  
  return (
    <span
      className={`ui-checkbox ${checked ? 'checked' : ''}`}
      onClick={() => setChecked(checked ? false : true)}
    ></span>
  )
}

export default Checkbox;
