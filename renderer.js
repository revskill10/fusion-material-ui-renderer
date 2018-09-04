import {createPlugin, createToken} from 'fusion-core';
import {prepare} from 'fusion-react';
import {generateStyles, defaultThemeOptions} from './mui';
import serverRender from './server';
import clientRender from './client';

export const renderer = (themeOptions=defaultThemeOptions) => {
  return el => {
    const styles = generateStyles(themeOptions);
    return prepare(el).then(() => {
      return __NODE__ 
      ? serverRender(el, {styles}) 
      : clientRender(el, {styles});
    });
  };
}
