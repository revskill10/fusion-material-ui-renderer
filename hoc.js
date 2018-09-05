import {prepared} from 'fusion-react';

export const sideEffect = (idStyle) => {
  const jssStyles = document.querySelector(idStyle);
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}
