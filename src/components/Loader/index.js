import React from 'react';
import styled from 'styled-components';

import blackLoader from '../../assets/oval-black.svg';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <Container>
      <img src={blackLoader} alt="loader" />
    </Container>
  );
}

export default Loader;
