import styled from "styled-components";

export const PostJobWrapper = styled.div`
  padding: 0;
  background: #f5f5f5;
  min-height: 100vh;

  .post-job-header {
    padding: 24px 24px 16px;
    background: white;
    margin-bottom: 0;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .steps-container {
    margin-bottom: 0;
    background: white;
    padding: 16px 24px 24px;
    border-radius: 0;
    border-bottom: 1px solid #f0f0f0;

    .ant-steps {
      max-width: 800px;
      margin: 0 auto;
    }

    .ant-steps-item-process .ant-steps-item-icon {
      background-color: #00bfa5;
      border-color: #00bfa5;
    }

    .ant-steps-item-finish .ant-steps-item-icon {
      background-color: #00bfa5;
      border-color: #00bfa5;
    }

    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-tail::after {
      background-color: #00bfa5;
    }

    .ant-steps-item-title {
      font-size: 13px;
    }
  }

  .form-card {
    background: white;
    padding: 40px 24px 24px;
    border-radius: 0;
    box-shadow: none;
    max-width: 1000px;
    margin: 0 auto;

    .ant-form-item {
      margin-bottom: 24px;
    }

    .ant-form-item-label {
      padding-bottom: 6px;
    }

    .ant-form-item-label > label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
      height: auto;
    }

    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      color: #ff4d4f;
    }

    .ant-input,
    .ant-select-selector,
    .ant-input-number,
    .ant-picker {
      border-radius: 6px;
      font-size: 14px;
    }

    .ant-input-number {
      width: 100%;
    }

    .helper-text {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }

    .skill-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;

      .ant-form-item {
        flex: 1;
        margin-bottom: 16px;
      }

      .expertise-select {
        width: 150px;
        flex: none;
      }
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #f0f0f0;

      .ant-btn {
        min-width: 120px;
        height: 40px;
        font-weight: 500;
        border-radius: 6px;
      }

      .ant-btn-primary {
        background-color: #004a7c;
        border-color: #004a7c;

        &:hover {
          background-color: #003a5d;
          border-color: #003a5d;
        }
      }
    }

    .two-column-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .three-column-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .four-column-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .budget-input-group {
      display: flex;
      gap: 8px;

      .ant-form-item {
        margin-bottom: 0;
      }

      .budget-input {
        flex: 1;
      }

      .budget-suffix {
        width: 120px;
        flex: none;
      }
    }

    .rich-editor-container {
      .quill {
        background: white;
        border: 1px solid #d9d9d9;
        border-radius: 6px;

        .ql-toolbar {
          border: none;
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
          border-radius: 6px 6px 0 0;
          padding: 12px;
        }

        .ql-container {
          border: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial;
          font-size: 14px;
          min-height: 250px;
        }

        .ql-editor {
          min-height: 250px;
          padding: 16px;
        }

        .ql-editor.ql-blank::before {
          color: #bfbfbf;
          font-style: normal;
          padding: 16px;
        }
      }
    }
  }
`;
