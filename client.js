import React from 'react';
import {hydrate} from 'react-dom';
import {withStyles} from './mui';

export default (app: Element<*>, {styles, idStyle}) => {
  hydrate(
    withStyles({app, styles})
    ,
    document.querySelector('#root'),
  );
  const jssStyles = document.querySelector(idStyle);
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
};
