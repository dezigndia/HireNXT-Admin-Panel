import styled from "styled-components";

export const PostNewJobWrapper = styled.div`
  background: #f8f9fd;
  padding: 24px 40px;

  .post-job-header {
    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #014c75;
      margin: 0;
    }
  }

  .ant-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }

  .ant-steps .ant-steps-item {
    flex: none !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible;
  }

  .ant-steps .ant-steps-item::after {
    display: none !important;
  }

  .ant-steps .ant-steps-item-tail {
    display: none !important;
  }

  .ant-steps .ant-steps-item .ant-steps-item-container .ant-steps-item-title::after {
    display: none;
  }

  .ant-steps .ant-steps-item .ant-steps-item-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 20px;
    border: 1px solid #e3e3e3;
    border-radius: 0;
    margin: 0;
    min-height: 64px;
  }

  .ant-steps.ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item {
    padding-inline-start: 0;
  }

  .ant-steps .ant-steps-item-active .ant-steps-item-container {
    background-color: #014c75;
    border-radius: 5px;
    border-color: #014c75;
  }

  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: #00d9a9;
    border-color: #00d9a9;
    margin: 0;
  }

  .ant-steps .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    color: #fff;
  }

  .ant-steps .ant-steps-item-wait .ant-steps-item-container {
    background-color: #fff;
  }

  .ant-steps .ant-steps-item-finish .ant-steps-item-container {
    background-color: #e6fff9;
    border-color: #00d9a9;
  }

  .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #00d9a9;
    border-color: #00d9a9;
    margin: 0;
    
    .ant-steps-icon {
      color: white;
    }
  }

  .ant-steps .ant-steps-item-icon {
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    flex-shrink: 0;
  }

  .ant-steps .ant-steps-item-wait .ant-steps-item-icon {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    margin: 0;
    
    .ant-steps-icon {
      color: #999;
    }
  }

  .ant-steps .ant-steps-item-content {
    min-height: auto;
  }

  .ant-steps .ant-steps-item-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: #595959;
    padding-right: 0 !important;
  }

  .ant-steps .ant-steps-item-process .ant-steps-item-title {
    color: #fff;
    font-weight: 600;
  }

  .ant-steps .ant-steps-item-finish .ant-steps-item-title {
    color: #1a1a1a;
  }

  .step-body {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: #262626;
      margin-bottom: 8px;
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
      
      .ant-input-number-input {
        height: 38px;
        padding: 8px 12px;
      }
    }

    .ant-picker {
      height: 40px;
    }

    .ant-select-multiple .ant-select-selector {
      min-height: 60px !important;
      height: auto !important;
      padding: 4px 8px !important;
    }

    .ant-select-multiple .ant-select-selection-overflow {
      flex-wrap: wrap;
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
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

  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    padding-top: 0;

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
`;
