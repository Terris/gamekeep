import React from 'react';
import { withPermission } from '../session';

const Dashboard = ({ authUser, dbUser }) => {
  return (
    <div className="dashboard">
      <h1>Dash</h1>
    </div>
  )
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Dashboard);
