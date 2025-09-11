// @ts-ignore
import styled from "styled-components";

export const LoginWrapper = styled.div`
  height: 100vh;

  .login-row {
    height: 100%;

    .login-form-container {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      padding: 3rem;

      .bg-text-1 {
        color: #01d9a9;
        font-family: Quicksand;
        font-weight: 600;
        font-size: 40px;
      }

      .bg-text-2 {
        text-align: center;
      }
    }

    .bg-login {
      background-color: #002b22;
      padding: 3rem;

      .bg-content {
        height: 100%;
        color: #ffffff;

        .bg-text-1 {
          color: #ffffff;
          font-weight: 400;
          font-size: 24px;
          line-height: 40px;
          text-align: center;
          margin-bottom: 0rem;
        }

        .bg-text-2 {
          color: #ffffff;
          font-weight: 700;
          font-size: 32px;
          line-height: 52.5px;
          text-align: center;
          margin-bottom: 2rem;
        }

        .bg-text-3 {
          font-weight: 600;
          font-size: 18px;
          color: #ffffff;
          margin-top: 2rem;
        }

        .bg-text-4 {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #ffffff;
          margin-bottom: 2rem;
          text-align: center;
        }
      }
    }
  }
`;
