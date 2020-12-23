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

    .fallback {
      width: 100%;
      border: 1px solid #4f98ff80;
      background-color: #4f98ff10;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 20px;

      span {
        text-align: center;
        color: #4f98ff;
        font-size: 12px;
      }
    }

    h3 {
      color: #333;
      font-size: 35px;
      margin-bottom: 30px;
      font-weight: 500;
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
