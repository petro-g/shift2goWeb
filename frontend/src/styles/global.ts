import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
 
  body {
    background: ${props => props.theme.colors.extraLight};
    color: ${props => props.theme.pallets.secondary};
    font-size: 16px;
    max-width: 100vw;
    min-width: 320px;
    font-family: "Montserrat", sans-serif;
  }
  .font-family-open-sans-pro {
    font-family: ${props => props.theme.typography.config.fontFamilyOpenSans};
  }
  .font-family-roboto-slab {
    font-family: ${props => props.theme.typography.config.fontFamilyRobotoSlab};
  }
  a,
  button {
      display: inline-block;
      text-decoration: none;
      outline: none;
  }
  a:hover,
  a:active,
  a:focus,
  button:hover,
  button:active,
  button:focus {
      text-decoration: none;
      outline: none;
  }
  a {
      color: ${props => props.theme.colors.lightBlue};
  }
  a:hover,
  a:focus {
      color: ${props => props.theme.colors.lightBlue};
      text-shadow: ${props => props.theme.shadow.two};
  }
  input,
  input:focus {
      outline: none;
      outline-offset: 0;
  }
  ul {
      list-style: none;
      margin: 0;
      padding: 0;
  }
  img {
      max-width: 100%;
      border: 0 none;
      display: block;
  }
  img:focus {
      border: 0 none;
      outline: none;
      outline-offset: 0;
  }
`;