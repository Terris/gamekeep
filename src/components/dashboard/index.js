import React from 'react';
import { withAuthorization } from '../session';

const Dashboard = () => (
  <div className="dashboard">
    <p>dashboard</p>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
