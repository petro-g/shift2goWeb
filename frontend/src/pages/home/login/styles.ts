import { Verification } from './components';
import styled from 'styled-components';

export const LoginContainer = styled.div`
width: 100%;
height: 100%;
  .left {
    padding-left: 5.25rem;
    padding-top: 5.5625rem;
  }
  .heroTitle {
    font-weight: bold;
    font-size: 1.6634rem;
    line-height: 2.25rem;
    // width: 27.9375rem;
    color: #4c4c4c;
    margin: 0;

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

  .setPassword {
    .form-group {
      div:nth-of-type(1) {
        margin-bottom: 30.18px;
      }
    }
  }

  .verification {
    margin-top: 67px;
    .resend {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 25px;
      letter-spacing: 0.38px;
      color: ${(props) => props.theme.colors.blue};
      position: absolute;
      right: 55px;
    }

    small {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.02em;
    }
    .form-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      /* margin-top: 66px; */
      width: 27.2081rem;
    }

    input {
      width: 81px;
      height: 81px;
      font-weight: 600;
      font-size: 36px;
      text-align: center;
      line-height: 25px;
      background: #f5f8fc;
      border: 1px solid #dcecff;
      box-sizing: border-box;
      border-radius: 13px;
      padding: 0;
    }
  }

  .formHolder {
    width: 34.125rem;
    // height: 37.9375rem;
    background: #ffffff;
    box-shadow: 0rem 3.6875rem 3.9375rem rgba(125, 136, 157, 0.08);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.verification {
      width: 546px;
      height: 580px;
      position: relative;
    }

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

  .resetSuccess {
    width: 657px;
    height: 584.77px;
    background: #ffffff;
    border-radius: 79px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 91.44px;

    h1 {
      font-weight: 600;
      font-size: 30.0848px;
      line-height: 137.8%;
      width: 285.85px;
      color: #000000;
    }

    .ripple-1 {
      width: 248.2px;
      height: 248.2px;
      background: #f3f8fe;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 49.95px;
      .ripple-2 {
        width: 205.58px;
        height: 205.58px;
        background: #dcebfe;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .ripple-3 {
          width: 151.68px;
          height: 151.68px;
          background: #b2d3fc;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .ripple-4 {
            width: 96.52px;
            height: 96.52px;
            background: #0c77f8;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
`;
