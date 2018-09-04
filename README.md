## Usage

```js

// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Root from './root.js';
import React from 'react';

import {renderer} from './plugins/material-ui/renderer';
import {defaultThemeOptions} from './plugins/material-ui/mui';
import {RenderToken} from 'fusion-core';


export default () => {
  const app = new App(Root);
  app.register(Router);
  app.register(RenderToken, renderer(defaultThemeOptions));

  
  return app;
};

```