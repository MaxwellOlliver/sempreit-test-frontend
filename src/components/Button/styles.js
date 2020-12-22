import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #4f98ff;
  color: #fff;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
  }

  img {
    width: 18px;
  }
`;
