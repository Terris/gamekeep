import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

const NoMatch = () => (
  <h4 data-testid="nomatch">Oops, that page doesn't seem to exist. Let's get you to the <Link to={ROUTES.HOME.path}>home page</Link>.</h4>
);

export default NoMatch;
