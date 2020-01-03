import React from 'react';
import { withAuthorization } from '../session';

const Dashboard = () => (
  <h2>Dashboard</h2>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
