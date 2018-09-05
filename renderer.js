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

const sideEffect = (idStyle) => {
  const jssStyles = document.querySelector(idStyle);
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}

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
      return prepare(el).then(() => {
        return __NODE__ 
        ? serverRender(el, {styles}, idStyle) 
        : clientRender(el, {styles}, sideEffect, idStyle);
      });
    };
  },
  middleware(
  ) {
    return async (ctx, next) => {
      if (!ctx.element) {
        return next();
      }
      
      return middleware(ctx, next);
    }
  }
});


