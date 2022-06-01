import styled from 'styled-components';

export const DashboardContainer = styled.div`
  .left {
    padding-top: 5.1875rem;
  }
  .logoHolder {
    margin-bottom: 66px;
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

  .mainNav {
    height: 68px;
  }

  .homeWelcome {
    font-size: 30px;
    line-height: 51px;
    letter-spacing: -0.02em;
    font-weight: bold;
    color: #000000;
    margin-bottom: 20px;
  }
  .homeShiftCreate {
    font-size: 18px;
    line-height: 21px;
    color: #ffffff;
    height: 68px;
    width: 250px;
    margin-bottom: 10px;

    svg {
      margin-right: 8px;
    }
  }
  .tableHolder {
    width: 1006px;
    height: 469px;
    background: #ffffff;
    border: 0.898148px solid #f5f8fc;
    box-sizing: border-box;
    border-radius: 5.38889px;
  }

  .BillingBoard {
    width: 1006px;
    padding-top: 54px;

    .current {
      width: 238px;
      height: 58px;
      background: #30bfa3;
      border-radius: 4px;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
    .tableTopBottom {
      font-weight: bold;
      font-size: 36px;
      line-height: 46px;
      /* identical to box height */

      letter-spacing: -0.02em;

      color: #000000;
    }
    .shiftSelect {
      width: 265px;
      height: 58px;
      border: 1px solid #e6e6ec;
      box-sizing: border-box;
      border-radius: 4px;
    }
    .tableTopHeader {
      font-weight: bold;
      font-size: 24px;
      line-height: 31px;
      letter-spacing: -0.02em;
      color: #000000;
    }
    .dateSelect {
      width: 265px;
      height: 58px;
      border: 1px solid #e6e6ec;
      box-sizing: border-box;
      border-radius: 4px;

      input {
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        color: #4c4c4c;
        border: none;
      }
      svg path{
        stroke: #fff;
        color: #0C77F8;
        fill: #0C77F8;
      }
    }
  }

  .settingsBoard{
    width: 1135px;

    .left{
      width: 36px;

      .tile{
        height: 98px;

        .side{
          
        }
      }
    }
  }

  .shiftsBoard {
    width: 1006px;
    padding-top: 54px;
    .homeWelcome {
      font-size: 48px;
      margin-bottom: 53px;
      img {
        width: 131px;
        height: 11.09px;
      }
    }

    .headTiles {
      border-bottom: 1.2px solid #d8d8d8;
      border-top: 1.2px solid #d8d8d8;
      padding-bottom: -2px;
      margin-bottom: 25px;
      .holdTiles {
        height: 72px;
        width: 213px;
        cursor: pointer;

        :nth-of-type(1) {
          .tileCount {
            background: #0a70ec;
            border-radius: 9px;

            color: #ffffff;
          }
        }

        :nth-of-type(2) {
          .tileCount {
            background: #d4eff7;
            border-radius: 9px;
            color: #0a70ec;
          }
        }

        :nth-of-type(3) {
          .tileCount {
            background: #e3f7ee;
            border-radius: 9px;
            color: #77d4a2;
          }
        }
        :nth-of-type(4) {
          .tileCount {
            background: #fce9ea;
            border-radius: 9px;
            color: #f25562;
          }
        }

        .tileTitle {
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          color: #bcc0c5;
          margin-right: 10px;
        }
        .tileCount {
          width: 33px;
          height: 33px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        &.active {
          border-bottom: 3px solid #0a70ec;
          .tileTitle {
            color: #000000;
          }
        }
      }
    }

    .tableTopHeader {
      font-weight: bold;
      font-size: 24px;
      line-height: 31px;
      letter-spacing: -0.02em;
      color: #000000;
    }

    .today {
      width: 201px;
    }

    .shiftSelect {
      width: 265px;
      height: 58px;
      border: 1px solid #e6e6ec;
      box-sizing: border-box;
      border-radius: 4px;
    }
    .dateSelect {
      width: 265px;
      height: 58px;
      border: 1px solid #e6e6ec;
      box-sizing: border-box;
      border-radius: 4px;

      input {
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        color: #4c4c4c;
        border: none;
      }
    }
  }

  .favoritesBoard {
    width: 1006px;
    padding-top: 54px;

    .roleFilter {
      width: 265px;
      height: 58px;
      border: 1px solid #e6e6ec;
      box-sizing: border-box;
      border-radius: 4px;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      /* identical to box height */

      color: #4c4c4c;
    }

    .filterBy {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;

      color: #4c4c4c;
    }
  }

  .homeBoard {
    // width: 1006px;
    padding-top: 54px;

    .emptyHolder {
      // width: 1005px;
      // height: 358px;
      background: #f5fcfb;
      border-radius: 18px;
      padding: 25px;
      .starter {
        font-weight: bold;
        font-size: 36px;
        line-height: 46px;
        color: #000000;
        margin-bottom: 23px;
      }

      .subStarter {
        font-weight: 600;
        font-size: 17px;
        line-height: 150%;
        letter-spacing: 0.005em;
        color: #9aa1a1;
        margin-bottom: 44px;
      }

      .starterButton {
        border: 1.4px solid #b8b8b8;
        box-sizing: border-box;
        border-radius: 4px;
        background: transparent;
        width: 251px;
        height: 65px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        span {
          margin-right: 15px;
          font-weight: bold;
          font-size: 18px;
          line-height: 23px;
          /* identical to box height */

          color: #000000;
        }
      }
    }
  }

  .helpBoard {
    .mainName {
      font-weight: bold;
      font-size: 48px;
      line-height: 61px;
      letter-spacing: -0.02em;
      margin-top: 64px;
      color: #000000;
    }

    .underLine {
      margin-bottom: 22px;
    }

    .subTitle {
      font-weight: 500;
      font-size: 16px;
      line-height: 162.8%;
      letter-spacing: 0.01em;
      color: #7d7b7b;
      margin-bottom: 74px;
    }

    .imageOne {
      // margin-right: 42px;
      img {
        // width: 424px;
        // height: 295px;
        border-radius: 10px;
      }
      .bottom {
        width: 424px;
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 0px 0px 10px 10px;
        background: #e3f7ee;
        margin-top: -5px;
        padding-left: 31px;
        padding-right: 49px;

      }
    }
    .imageTwo {
      img {
        // width: 423.68px;
        // height: 294.79px;
        border-radius: 10px;
      }

      .bottom {
        width: 424px;
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 0px 0px 10px 10px;
        background: #f8d2cc;
        margin-top: -5px;
        padding-left: 31px;
        padding-right: 49px;

      }
    }
  }

  .bord-bott {
    border-bottom: 1px solid #e6e6e6
  }

  .toggle-checkbox:checked {
    @apply: right-0 border-green-400;
    right: 0;
    border-color: #0C77F8;
  }
  .toggle-checkbox:checked + .toggle-label {
    @apply: bg-green-400;
    background-color: #0C77F8;
  }

  .notify-box {
    width: 400px
  }

  .no-wrap{
    flex: 0 0 auto; 
  }
`;
