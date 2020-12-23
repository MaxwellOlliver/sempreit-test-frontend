import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    border: 0;
    box-sizing: border-box;
  }
  
  html, body, input, button {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    color: #333;
    font-size: 14px;
  }

  button {
    cursor: pointer;
    transition: all .3s;

    
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 8px;
    border-radius: 8px;
    background: #4f98ff;
  }
  ::-webkit-scrollbar-track {
    background-color: #ccc;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #52525e;
  }

  .Toastify__progress-bar {
    background: #4f98ff !important;
    color: #4f98ff !important;
  }
`;
