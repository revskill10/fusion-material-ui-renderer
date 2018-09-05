import {createPlugin, createToken} from 'fusion-core';
import {prepare, middleware} from 'fusion-react';
import {generateStyles, defaultThemeOptions} from './mui';
import serverRender from './server';
import clientRender from './client';

export const CustomThemeOptionsToken: Token<mixed> = createToken(
  'CustomThemeOptionsToken'
);

export const IdStyleToken: Token<mixed> = createToken(
  'IdStyleToken'
);

export const renderer = createPlugin({
  deps: {
    customThemeOptions: CustomThemeOptionsToken.optional,
    idStyle: IdStyleToken.optional,
  },
  provides({
      customThemeOptions=defaultThemeOptions,
      idStyle="jss-server-side",
    }) {
    return el => {
      const styles = generateStyles(customThemeOptions);
      const sideEffect = (idStyle) => {
        const jssStyles = document.querySelector(idStyle);
        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      }
      return prepare(el).then(() => {
        return __NODE__ 
        ? serverRender(el, {styles}, idStyle) 
        : clientRender(el, {styles}, sideEffect, idStyle);
      });
    };
  },
});


