import styled from 'styled-components';

export const SignupContainer = styled.div`
  .left {
    padding-left: 5.25rem;
    padding-top: 5.5625rem;
  }
  .heroTitle {
    font-weight: bold;
    font-size: 36px;
    line-height: 46px;
    letter-spacing: -0.02em;
    width: 27.9375rem;
    color: #000000;
    margin-bottom: 54.1px;

    strong {
      color: ${(props) => props.theme.colors.darkBlue};
    }
  }

  .business {
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: #8c8ca1;
    margin-bottom: 54.1px;

    &.active {
      color: #0c77f8;
    }
  }

  .account {
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: #8c8ca1;
    &.active {
      color: #0c77f8;
    }
  }

  .rib {
    display: flex;
    flex-direction: column;
    align-items: center;
    .number {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1.5px solid #8c8ca1;
      color: #8c8ca1;

      &.active {
        border: 1.5px solid #0c77f8;
        color: #0c77f8;
      }
    }
    .line {
      width: 0px;
      height: 45px;
      border: 1px solid #8c8ca1;
    }
  }

  .right {
    padding-top: 66px;

    .firstButton{
      width: 229px;
    }

    .secondButton{
      width: 229px;
    }

    form {
      width: 703px;
      display: flex;
      flex-direction: column;

      .half{
        .inputHold{
          width: 326px;
        }
      }

      .title {
        font-weight: bold;
        font-size: 32px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #000000;
        margin-bottom: 7px;
      }

      .subTitle {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.02em;
        color: #8c8ca1;
        margin-bottom: 29px;
      }

      .inputHold {
        margin-bottom: 28px;
        width: 703px;
      }
    }

    .head {
      padding-right: 83px;
      padding-bottom: 69px;

      .goToLogin {
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;

        a {
          color: ${(props) => props.theme.colors.blue};
        }
      }
    }
  }
`;
