import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 10px;

    border: 1px solid #ccc;
    color: #333;

    transition: all 0.3s;

    &.error {
      border-color: #f55f5f;
      color: #f55f5f;
      &::placeholder {
        color: #f55f5f80;
      }
    }

    ${(props) =>
      !props.error
        ? `
      &:focus {
      border-color: #4f98ff;

      &::placeholder {
        color: #808080;
      }
    }
    `
        : ''}
  }

  p.error {
    display: ${(props) => (props.error ? 'block' : 'none')};
    font-size: 12px;
    color: #f55f5f;
    margin-top: 5px;
  }
`;
