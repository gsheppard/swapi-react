import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

console.log('LOADING');
render(
  <Root />,
  document.getElementById('root')
);
