import React from 'react';

import { Container } from './styles';

function Input({ type = null, name, error, placeholder, setValue, value }) {
  return (
    <Container error={!!error}>
      <input
        type={type || 'text'}
        name={name}
        id={name + 'input'}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={error ? 'error' : ''}
        value={value}
      />
      <p className="error">{error}</p>
    </Container>
  );
}

export default Input;
