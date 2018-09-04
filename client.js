import React from 'react';
import {hydrate} from 'react-dom';
import {withStyles} from './mui';

export default (app: Element<*>, {styles}) => {
  hydrate(
    withStyles({app, styles})
    ,
    document.querySelector('#root'),
  );
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
};
