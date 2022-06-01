import styled from 'styled-components';

export const LoginContainer = styled.div`
  .left {
    padding-left: 5.25rem;
    padding-top: 5.5625rem;
  }
  .heroTitle {
    font-weight: bold;
    font-size: 1.6634rem;
    line-height: 2.25rem;
    width: 27.9375rem;
    color: #4c4c4c;

    strong {
      color: ${(props) => props.theme.colors.darkBlue};
    }
  }

  .heroImages {
    .ellipse-1 {
      position: absolute;
      width: 5rem;
      height: 5rem;
      left: 10%;
      top: 3rem;
      border-radius: 50%;
      background: #777889;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
    .ellipse-2 {
      position: absolute;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      right: 35%;
      background: #f8d2cc;
      top: 3rem;
    }
    .ellipse-3 {
      position: absolute;
      width: 3rem;
      height: 3rem;
      left: 444.28px;
      top: 15rem;
      border-radius: 50%;
      background: #b2d3fc;
    }
    .ellipse-4 {
      position: absolute;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      right: 30%;
      top: 70%;
      background: #ca4d37;
    }
    .ellipse-5 {
      position: absolute;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      left: 15%;
      top: 70%;
      background: #98dddf;
    }
    .ellipse-6 {
      position: absolute;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      left: 0;
      background: #f299a1;
      top: 40%;
    }
    .ellipse-7 {
      position: absolute;
      width: 9.9475rem;
      height: 9.9475rem;
      border-radius: 50%;
      left: 28%;
      top: 11.8856rem;
      overflow: hidden;
      background: #f4d17a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 23.2069rem;
        height: 15.4431rem;
      }
    }
  }

  .formHolder {
    width: 34.125rem;
    height: 37.9375rem;
    background: #ffffff;
    box-shadow: 0rem 3.6875rem 3.9375rem rgba(125, 136, 157, 0.08);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      width: 435.33px;
      margin-bottom: 3.4469rem;
      h1 {
        font-weight: bold;
        font-size: 2.75rem;
        line-height: 3.5rem;
        color: #000000;
      }
    }

    .forgot {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 1.9788rem;
      color: #0c77f8;
      float: right;
    }

    .form-group:nth-of-type(2) {
      margin-bottom: 2.2788rem;
    }
    .form-group:nth-of-type(3) {
      margin-bottom: 17.39px;
    }
    .form-group:nth-of-type(4) {
      width: 435.33px;
    }
  }
`;
