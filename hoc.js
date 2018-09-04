import {prepared} from 'fusion-react';

const sideEffect = () => {
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}


export default sideEffect;
