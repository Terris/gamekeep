import React from 'react';

export default Admin = () => (
  
)

const condition = ({ authUser }) => authUser == 'foo';
export default withPermission(condition)(Dashboard);
