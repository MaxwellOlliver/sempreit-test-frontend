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
    color: #fff;
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
    background: #5f5f6b;
  }
  ::-webkit-scrollbar-track {
    background-color: #40404a;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #52525e;
  }
`;
