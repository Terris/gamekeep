import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import { routes } from '../../constants';

const PageTitle = () => {
  const [pageTitle, setPageTitle] = useState("GameKeep");
  let location = useLocation();
  
  useEffect(() => {
    let route = _.find(routes, function(rt) {
      return rt.path === location.pathname
    });
    if (route) {
      setPageTitle(route.title);
    }
  }, [location]);
  
  return (
    <h2 className="pagetitle">{pageTitle}</h2>
  )
}

export default PageTitle
