import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import Bangers from '@fonts/Bangers/Bangers-Regular.ttf';
import Nunito from '@fonts/Nunito/Nunito-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Bangers';
    font-weight: normal;
    font-style: normal;
    src: url(${Bangers});
  }

  @font-face {
    font-family: 'Nunito';
    font-weight: normal;
    font-style: normal;
    src: url(${Nunito});
  }

  body {
    @media (min-width: 1025px) {
      height: 100vh;
    }
    font-family: 'Nunito';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    background-color: #F1F0E4;
    width: 100vw;
    height: 100vh;
    max-height: -webkit-fill-available;
    min-width: 320px;
    user-select: none;
    overflow: hidden;
  }
`;

export default GlobalStyle;
