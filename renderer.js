import {createPlugin, createToken} from 'fusion-core';
import {prepare, middleware} from 'fusion-react';
import {generateStyles, defaultThemeOptions} from './mui';
import {sideEffect} from './hoc';
import serverRender from './server';
import clientRender from './client';

export const CustomThemeOptionsToken: Token<mixed> = createToken(
  'CustomThemeOptionsToken'
);

export const SideEffectToken: Token<mixed> = createToken(
  'SideEffectToken'
);

export const IdStyleToken: Token<mixed> = createToken(
  'IdStyleToken'
);

export const renderer = createPlugin({
  deps: {
    customThemeOptions: CustomThemeOptionsToken.optional,
    sideEffect: SideEffectToken.optional,
    idStyle: IdStyleToken.optional,
  },
  provides({
      customThemeOptions=defaultThemeOptions,
      idStyle="jss-server-side"
    }) {
    return el => {
      const styles = generateStyles(customThemeOptions);
      return prepare(el).then(() => {
        return __NODE__ 
        ? serverRender(el, {styles}, idStyle) 
        : clientRender(el, {styles}, idStyle);
      });
    };
  },
  middleware(
    {sideEffect, idStyle}
  ) {
    return async (ctx, next) => {
      if (!ctx.element) {
        return next();
      }
      
      if (__BROWSER__) {
        await middleware(ctx, next);
        sideEffect(idStyle);
      } else {
        await middleware(ctx, next);
      }
    }
  }
});


