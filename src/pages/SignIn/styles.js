import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      color: #333;
      font-size: 35px;
      margin-bottom: 30px;
    }

    > span {
      color: #333;
      font-size: 12px;
      width: 100%;
      text-align: left;

      a {
        color: #4f98ff;
        margin-left: 5px;
      }
    }
  }
`;
