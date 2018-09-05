## Usage

```js

// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Root from './root.js';

import {renderer} from './plugins/material-ui/renderer';
import {RenderToken} from 'fusion-core';


export default () => {
  const app = new App(Root);
  app.register(Router);
  app.register(RenderToken, renderer);
  
  return app;
};


```

## Current issues

- [This warning](https://github.com/reactjs/react-transition-group/issues/164) on both server and client side

```
warning.js:33 Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the TransitionGroup component.
```

- Couldn't use `Root` with a `componentDidMount`, the error is: 

```
A Router could have only one child component
```