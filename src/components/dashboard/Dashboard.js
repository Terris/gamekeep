import React from 'react';
import { withPermission } from '../session';
import { Games } from '../games';

const Dashboard = ({ authUser, dbUser }) => {
  return (
    <div className="dashboard">
      <Games dbUser={dbUser} />
    </div>
  )
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Dashboard);
