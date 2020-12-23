import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Loader from '../../assets/oval.svg';

function Button({ type = 'button', text, style, onClick, isLoading }) {
  return (
    <Container type={type} style={style} onClick={onClick}>
      {isLoading ? <img src={Loader} alt="loader" /> : <span>{text}</span>}
    </Container>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Button;
