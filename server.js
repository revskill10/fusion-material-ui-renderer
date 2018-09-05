import React from 'react';
import {renderToString} from 'react-dom/server'
import {withStyles, renderFullPage} from './mui';

import type {Element} from 'react';

export default (app: Element<*>, {styles}, idStyle) => {
  const html = renderToString(
    withStyles({app, styles})
  )
  const css = styles.sheetsRegistry.toString();
  return renderFullPage(html, css, idStyle);
}