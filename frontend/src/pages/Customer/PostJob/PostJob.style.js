import styled from "styled-components";

export const PostJobWrapper = styled.div`
  background: #f8f9fd;
  min-height: 100vh;

  .post-job-header {
    padding: 24px 40px;
    background: white;
    border-bottom: 1px solid #e8e8e8;

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #014c75;
      margin: 0;
    }
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
    background: white;
    padding: 40px;
    margin: 24px 40px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

    .ant-form-item {
      margin-bottom: 24px;
    }

    .ant-form-item-label {
      padding-bottom: 8px;

      > label {
        font-size: 13px;
        font-weight: 500;
        color: #262626;
        height: auto;

        &::after {
          display: none;
        }
      }

      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
        color: #ff4d4f;
        margin-right: 4px;
      }
    }

    .ant-input,
    .ant-select-selector,
    .ant-input-number-input {
      font-size: 13px;
      color: #595959;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 8px 12px;

      &::placeholder {
        color: #bfbfbf;
      }

      &:hover {
        border-color: #40a9ff;
      }

      &:focus,
      &:focus-within {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
      }
    }

    .ant-select-selector {
      height: 40px !important;
      padding: 4px 12px !important;
    }

    .ant-select-selection-search-input {
      height: 38px !important;
    }

    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      line-height: 38px !important;
      font-size: 13px;
    }

    .ant-input-number {
      width: 100%;
      border-radius: 4px;

      .ant-input-number-input {
        height: 38px;
        padding: 8px 12px;
      }
    }

    .skill-row {
      display: grid;
      grid-template-columns: 1fr 180px;
      gap: 16px;
      margin-bottom: 16px;

      .ant-form-item {
        margin-bottom: 0;
      }
    }

    .two-column-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .four-column-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;

      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 32px;
      padding-top: 0;
      border-top: none;

      .ant-btn {
        height: 40px;
        padding: 0 32px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
      }

      .ant-btn-default {
        color: #595959;
        border-color: #d9d9d9;
        background: white;

        &:hover {
          color: #40a9ff;
          border-color: #40a9ff;
        }
      }

      .ant-btn-primary {
        background-color: #004a7c;
        border-color: #004a7c;
        color: white;

        &:hover {
          background-color: #003a63;
          border-color: #003a63;
        }
      }
    }

    .rich-editor-container {
      .quill {
        background: white;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        .ql-toolbar {
          border: none;
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
          border-radius: 4px 4px 0 0;
          padding: 8px;
        }

        .ql-container {
          border: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial;
          font-size: 14px;
          min-height: 200px;
        }

        .ql-editor {
          min-height: 200px;
          padding: 12px;
          font-size: 13px;
        }

        .ql-editor.ql-blank::before {
          color: #bfbfbf;
          font-style: normal;
          left: 12px;
        }
      }
    }
  }
`;
