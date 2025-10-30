import styled from "styled-components";

export const ProfileWrapper = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  .profile-title {
    font-size: 28px;
    font-weight: 700;
    color: #014c75;
    margin-bottom: 24px;
  }

  .profile-tab {
    display: inline-block;
    padding: 10px 20px;
    border-bottom: 3px solid #00d9a9;
    color: #00d9a9;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .form-section {
    background: white;
    padding: 40px;
    border-radius: 8px;
    max-width: 900px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e8e8e8;
  }

  .ant-form-item-label > label {
    font-weight: 600;
    color: #333;
  }

  .ant-input,
  .ant-input-password {
    border-radius: 6px;
    padding: 10px 15px;
  }

  .password-field {
    position: relative;

    .change-password-link {
      position: absolute;
      right: 0;
      top: -28px;
      color: #00d9a9;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;

      &:hover {
        color: #01c49b;
      }
    }
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-top: 32px;
  }

  .save-button {
    background: #014c75;
    border: none;
    border-radius: 6px;
    padding: 10px 32px;
    height: auto;
    font-weight: 600;

    &:hover {
      background: #013a5a;
    }
  }

  .back-button {
    border: 2px solid #d9d9d9;
    border-radius: 6px;
    padding: 10px 32px;
    height: auto;
    font-weight: 600;

    &:hover {
      border-color: #014c75;
      color: #014c75;
    }
  }
`;
