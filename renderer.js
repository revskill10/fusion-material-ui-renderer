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

export const renderer = createPlugin({
  deps: {
    customThemeOptions: CustomThemeOptionsToken.optional,
    sideEffect: SideEffectToken.optional,
  },
  provides({
      customThemeOptions=defaultThemeOptions,
    }) {
    return el => {
      const styles = generateStyles(customThemeOptions);
      return prepare(el).then(() => {
        return __NODE__ 
        ? serverRender(el, {styles}) 
        : clientRender(el, {styles});
      });
    };
  },
  middleware(
    {sideEffect}
  ) {
    return async (ctx, next) => {
      if (!ctx.element) {
        return next();
      }
      
      if (__BROWSER__) {
        await middleware(ctx, next);
        sideEffect();
      } else {
        await middleware(ctx, next);
      }
    }
  }
});


