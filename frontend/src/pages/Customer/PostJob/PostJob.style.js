import styled from "styled-components";

export const PostJobWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;

  .post-job-header {
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .steps-container {
    margin-bottom: 32px;
    background: white;
    padding: 24px;
    border-radius: 8px;

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
  }

  .form-card {
    background: white;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .ant-form-item-label > label {
      font-weight: 500;
      color: #333;
    }

    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      color: #ff4d4f;
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
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #f0f0f0;

      .ant-btn {
        min-width: 120px;
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
      gap: 16px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .three-column-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

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
      gap: 16px;

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
        }

        .ql-editor.ql-blank::before {
          color: #bfbfbf;
          font-style: normal;
        }
      }
    }
  }
`;
