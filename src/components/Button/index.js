import React from 'react';

import { Container } from './styles';
import Loader from '../../assets/oval.svg';

function Button({ type = 'button', text, style, onClick, isLoading }) {
  return (
    <Container type={type} style={style} onClick={onClick}>
      {isLoading ? <img src={Loader} alt="loader" /> : <span>{text}</span>}
    </Container>
  );
}

export default Button;
