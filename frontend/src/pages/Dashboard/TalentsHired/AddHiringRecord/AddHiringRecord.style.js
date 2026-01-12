import styled from "styled-components";

export const AddHiringRecordWrapper = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  .page-header {
    margin-bottom: 32px;

    h1 {
      font-size: 28px;
      font-weight: 600;
      color: #014c75;
      margin: 0;
    }
  }

  .form-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .steps-container {
    background: white;
    padding: 32px 40px 24px;
    border-bottom: 1px solid #e8e8e8;

    .ant-steps-item {
      padding: 0;
    }

    .ant-steps-item-icon {
      width: 36px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      font-weight: 600;
      margin: 0 auto;
    }

    .ant-steps-item-wait .ant-steps-item-icon {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      
      .ant-steps-icon {
        color: #999;
      }
    }

    .ant-steps-item-process .ant-steps-item-icon {
      background-color: #00d9a9;
      border-color: #00d9a9;
      
      .ant-steps-icon {
        color: white;
      }
    }

    .ant-steps-item-finish .ant-steps-item-icon {
      background-color: #00d9a9;
      border-color: #00d9a9;
      
      .ant-steps-icon {
        color: white;
      }
    }

    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
      background-color: #00d9a9;
    }

    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after {
      background-color: #d9d9d9;
    }

    .ant-steps-item-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 32px;
      color: #595959;
    }

    .ant-steps-item-process .ant-steps-item-title {
      color: #1a1a1a;
      font-weight: 600;
    }

    .ant-steps-item-finish .ant-steps-item-title {
      color: #1a1a1a;
    }
  }

  .form-card {
    padding: 40px;

    .ant-form-item-label > label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .ant-input,
    .ant-input-number,
    .ant-select-selector,
    .ant-picker {
      height: 44px;
      border-radius: 8px;
      border: 1px solid #d9d9d9;
      font-size: 14px;

      &:hover {
        border-color: #00d9a9;
      }

      &:focus,
      &.ant-input-focused,
      &.ant-select-focused .ant-select-selector,
      &.ant-picker-focused {
        border-color: #00d9a9;
        box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1);
      }
    }

    .ant-select-selector {
      height: 44px !important;
      display: flex;
      align-items: center;
    }

    .ant-input-number {
      width: 100%;
    }

    .ant-input-number-input {
      height: 42px;
    }

    .two-column-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .three-column-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e8e8e8;

      .ant-btn {
        height: 44px;
        padding: 0 32px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:not(.ant-btn-primary) {
          border: 1px solid #d9d9d9;
          background: white;
          color: #333;

          &:hover {
            border-color: #00d9a9;
            color: #00d9a9;
          }
        }

        &.ant-btn-primary {
          background: #00d9a9;
          border-color: #00d9a9;
          color: white;

          &:hover {
            background: #01c49b;
            border-color: #01c49b;
          }
        }
      }
    }
  }

  .info-display {
    background: #f8f9fd;
    padding: 16px;
    border-radius: 8px;
    margin-top: 8px;

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e8e8e8;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: #666;
        font-size: 14px;
        font-weight: 500;
      }

      .value {
        color: #014c75;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;
