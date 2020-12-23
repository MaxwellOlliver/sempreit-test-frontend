import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Input({ type = 'text', error, setValue, value, ...props }) {
  return (
    <Container error={!!error}>
      <input
        {...props}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        className={error ? 'error' : ''}
        value={value}
      />
      <p className="error">{error}</p>
    </Container>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
