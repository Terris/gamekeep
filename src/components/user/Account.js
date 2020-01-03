import React, { Fragment } from 'react';
import { withAuthorization } from '../session';

import EditUser from './EditUser';

const Account = ({ authUser }) => {
  return (
    <Fragment>
      {!!authUser.photoURL && <img src={authUser.photoURL} alt="user avatar" /> }
      <h2>{authUser.displayName}</h2>
      <p>{authUser.email}</p>
      <hr/>
      <EditUser />
    </Fragment>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);
