import styled from "styled-components";

export const AddTalentProfileWrapper = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  .page-header {
    margin-bottom: 24px;

    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #014c75;
      margin: 0;
    }
  }

  .form-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .steps-container {
    background: white;
    padding: 32px 48px;
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .ant-steps-item-process .ant-steps-item-icon {
      background: #00d9a9;
      border-color: #00d9a9;
    }

    .ant-steps-item-finish .ant-steps-item-icon {
      border-color: #00d9a9;

      .ant-steps-icon {
        color: #00d9a9;
      }
    }

    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-tail::after {
      background-color: #00d9a9;
    }
  }

  .form-card {
    background: white;
    padding: 32px 48px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const FormStepWrapper = styled.div`
  .form-title {
    font-size: 20px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 24px;
    text-align: center;
  }

  .ant-form-item-label > label {
    font-weight: 500;
    color: #014c75;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;

    .ant-btn-primary {
      background: #00d9a9;
      border-color: #00d9a9;
      height: 40px;
      padding: 0 32px;
      font-weight: 500;

      &:hover {
        background: #01c49b;
        border-color: #01c49b;
      }
    }

    .ant-btn-default {
      height: 40px;
      padding: 0 32px;
      font-weight: 500;
      color: #014c75;
      border-color: #014c75;

      &:hover {
        color: #00d9a9;
        border-color: #00d9a9;
      }
    }
  }

  .upload-section {
    margin-bottom: 16px;

    .upload-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #014c75;
    }

    .file-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      padding: 8px 12px;
      background: #f8f9fd;
      border-radius: 4px;

      .file-name {
        color: #014c75;
        font-size: 14px;
      }

      .remove-btn {
        color: #ff4d4f;
        cursor: pointer;
        font-weight: 600;

        &:hover {
          color: #d32f2f;
        }
      }
    }
  }
`;
