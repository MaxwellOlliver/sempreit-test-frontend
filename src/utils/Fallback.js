import React from 'react';
import { Redirect } from 'react-router-dom';

function Fallback() {
  const token = !!localStorage.getItem('SI_TOKEN');
  return token ? (
    <Redirect to={{ pathname: '/products' }} />
  ) : (
    <Redirect to={{ pathname: '/signin' }} />
  );
}

export default Fallback;
