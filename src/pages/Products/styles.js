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
  display: flex;
  flex-direction: column;

  nav {
    width: 100%;
    height: 80px;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;

    .title {
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
      }
      h3 {
        font-size: 25px;
        font-weight: 500;
      }
    }

    .profile {
      height: 100%;
      display: flex;
      align-items: center;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 20px;

        h6 {
          font-size: 16px;
          font-weight: 400;
        }

        span {
          color: #808080;
          font-size: 12px;
        }
      }

      button {
        height: 20px;
        font-size: 14px;
        color: #f55f5f;
        background-color: transparent;
      }
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 80px);
    padding: 50px 120px;
    padding-top: 20px;

    .modal-container {
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

        button:first-child {
          margin-right: 10px;
        }

        h3 {
          margin-bottom: 10px;
        }
      }
    }

    section {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        margin-bottom: 20px;

        .search {
          display: flex;
          align-items: center;
          height: 100%;
          width: 20%;

          input {
            width: 100%;
            height: 100%;
          }

          svg {
            margin-right: 10px;
            min-width: 16px;
          }
        }

        .actions {
          display: flex;
          align-self: flex-end;
          width: 400px;
        }
      }

      > label {
        width: 100%;
        display: flex;
        padding: 0 10px;

        span {
          width: calc(100% / 2);
          padding-left: 20px;
          font-weight: bold;
          color: #808080;
        }
      }

      ul {
        width: 100%;
        height: 100%;
        max-height: 100%;
        padding: 10px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        list-style: none;

        li {
          width: 100%;
          min-height: 50px;
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
          background-color: #fff;
          transition: all 0.3s;

          &:hover {
            filter: brightness(0.98);
          }

          &.selected {
            filter: brightness(0.92);
          }
          span {
            width: calc(100% / 2);
            padding-left: 20px;
          }

          &.no-products {
            border: none;
            justify-content: center;

            span {
              font-weight: 700;
              color: #ccc;
              width: auto;
            }
          }
        }
      }
    }
  }
`;
