import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  animation: ${fade} 0.3s ease;

  .modal {
    width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    form {
      width: 100%;

      .row,
      .title {
        display: flex;

        button:first-child {
          margin-right: 10px;
        }
      }

      .column {
        width: 50%;
        padding: 0 10px;

        span {
          font-size: 12px;
          color: #808080;
        }
      }

      .title {
        align-items: center;
        margin-bottom: 20px;
        svg {
          margin-right: 5px;
        }

        h3 {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
`;
