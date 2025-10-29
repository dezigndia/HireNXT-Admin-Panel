import styled from "styled-components";

export const SubmitProfilesWrapper = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  .header {
    margin-bottom: 24px;

    .back-button {
      margin-bottom: 12px;
      color: #595959;
      font-weight: 500;

      &:hover {
        color: #00d9a9;
      }
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: #014c75;
    }
  }

  .job-summary-card {
    margin-bottom: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;

    .ant-card-body {
      padding: 24px;
    }

    .job-header {
      margin-bottom: 24px;

      .job-id {
        font-size: 12px;
        color: #8c8c8c;
        margin-bottom: 8px;
      }

      .job-title {
        font-size: 20px;
        font-weight: 600;
        color: #014c75;
        margin: 0 0 12px 0;
      }

      .job-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;

        .salary {
          font-size: 15px;
          color: #00d9a9;
          font-weight: 700;
          background: #e6fff9;
          padding: 4px 12px;
          border-radius: 6px;
        }
      }
    }

    .metrics-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
      padding: 20px 0;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;

      .metric-box {
        display: flex;
        align-items: center;
        gap: 16px;

        .metric-icon {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-info {
          h3 {
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: #262626;
          }

          p {
            font-size: 13px;
            color: #8c8c8c;
            margin: 0;
          }
        }
      }
    }

    .primary-skills {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;

      .skills-label {
        font-weight: 600;
        color: #014c75;
        margin-right: 8px;
      }

      .skill-tag {
        margin: 0;
        font-size: 13px;
      }
    }
  }

  .profiles-section {
    .profiles-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 16px;

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #014c75;
        margin: 0;
      }

      .action-buttons {
        display: flex;
        gap: 12px;

        .bench-pool-btn {
          border-color: #00d9a9;
          color: #00d9a9;
          font-weight: 600;
          height: 44px;
          padding: 0 24px;
          border-radius: 8px;

          &:hover {
            background: #e6fff9;
            border-color: #01c49b;
            color: #01c49b;
          }
        }

        .add-resource-btn {
          background: #00d9a9;
          border-color: #00d9a9;
          font-weight: 600;
          height: 44px;
          padding: 0 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 217, 169, 0.3);

          &:hover {
            background: #01c49b;
            border-color: #01c49b;
            box-shadow: 0 6px 16px rgba(0, 217, 169, 0.4);
          }
        }
      }
    }

    .profiles-table-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: none;

      .ant-card-body {
        padding: 0;
      }

      .ant-table {
        .ant-table-thead > tr > th {
          background: #fafafa;
          font-weight: 600;
          color: #262626;
          border-bottom: 2px solid #f0f0f0;
        }

        .ant-table-tbody > tr:hover > td {
          background: #f5f5f5;
        }
      }
    }
  }

  .bench-pool-modal,
  .add-resource-modal {
    .ant-modal-header {
      display: none;
    }

    .ant-modal-body {
      padding: 32px;
    }

    .ant-modal-close {
      top: 16px;
      right: 16px;
    }

    .modal-content {
      .search-wrapper {
        margin-bottom: 24px;
      }

      .modal-search {
        width: 100%;

        .ant-input-affix-wrapper {
          border-radius: 8px;
          border: 1px solid #d9d9d9;
          padding: 10px 16px;
          background: #ffffff;

          &:hover {
            border-color: #00d9a9;
          }

          &:focus-within {
            border-color: #00d9a9;
            box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1);
          }

          .ant-input {
            font-size: 14px;
            border: none;
            box-shadow: none;
            background: transparent;

            &:focus {
              box-shadow: none;
            }

            &::placeholder {
              color: #bfbfbf;
            }
          }

          .ant-input-prefix {
            margin-right: 12px;
          }

          .ant-input-clear-icon {
            font-size: 14px;
            color: #bfbfbf;

            &:hover {
              color: #00d9a9;
            }
          }
        }
      }

      .bench-table {
        margin-bottom: 24px;

        .ant-table {
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          overflow: hidden;
        }

        .ant-table-thead > tr > th {
          background: #fafafa;
          font-weight: 600;
          color: #014c75;
          border-bottom: 2px solid #e8e8e8;
          font-size: 13px;
          padding: 12px 14px;
        }

        .ant-table-tbody > tr {
          transition: all 0.3s;

          td {
            padding: 12px 14px;
            font-size: 13px;
          }

          &:hover > td {
            background: #f8f9fd;
          }

          &.ant-table-row-selected > td {
            background: #e6fff9;
          }
        }

        .ant-checkbox-wrapper {
          .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #014c75;
            border-color: #014c75;
          }

          .ant-checkbox:hover .ant-checkbox-inner {
            border-color: #014c75;
          }

          .ant-checkbox-inner {
            border-radius: 4px;
            width: 18px;
            height: 18px;
          }
        }
      }

      .selected-section {
        background: #f8f9fd;
        border: 1px solid #e8e8e8;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;

        .selected-tags {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          .selected-tag {
            background: white;
            border: 1px solid #014c75;
            color: #014c75;
            font-size: 13px;
            padding: 6px 16px;
            border-radius: 20px;
            margin: 0;

            .anticon-close {
              color: #014c75;
              margin-left: 8px;
              transition: color 0.3s;

              &:hover {
                color: #ff4d4f;
              }
            }
          }
        }
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        padding-top: 24px;
        border-top: 1px solid #e8e8e8;

        .add-resource-btn-modal {
          background: #014c75;
          border-color: #014c75;
          font-weight: 600;
          height: 44px;
          padding: 0 36px;
          border-radius: 8px;
          font-size: 15px;
          box-shadow: 0 4px 12px rgba(1, 76, 117, 0.3);

          &:hover:not(:disabled) {
            background: #013a5a;
            border-color: #013a5a;
            box-shadow: 0 6px 16px rgba(1, 76, 117, 0.4);
          }

          &:disabled {
            background: #d9d9d9;
            border-color: #d9d9d9;
            color: #8c8c8c;
            box-shadow: none;
            cursor: not-allowed;
          }
        }
      }
    }

    .ant-form {
      .ant-form-item {
        margin-bottom: 20px;
      }

      .ant-form-item-label {
        padding-bottom: 8px;

        > label {
          font-weight: 500;
          color: #262626;
          font-size: 14px;

          &::after {
            content: none;
          }
        }
      }

      .ant-input,
      .ant-select-selector,
      .ant-input-number {
        border-radius: 6px;
        border: 1px solid #d9d9d9;
        padding: 10px 16px;
        font-size: 14px;

        &:hover {
          border-color: #00d9a9;
        }

        &:focus,
        &:focus-within {
          border-color: #00d9a9;
          box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1);
        }

        &::placeholder {
          color: #bfbfbf;
        }
      }

      .ant-select-selector {
        padding: 8px 12px !important;
        height: auto !important;
      }

      .ant-select-selection-placeholder {
        color: #bfbfbf;
      }

      .ant-upload {
        .ant-btn {
          border-radius: 6px;
          border: 1px solid #d9d9d9;
          height: 40px;
          padding: 0 24px;
          font-size: 14px;

          &:hover {
            border-color: #00d9a9;
            color: #00d9a9;
          }

          .anticon {
            margin-right: 8px;
          }
        }
      }

      .ant-btn-primary {
        background: #00d9a9;
        border-color: #00d9a9;
        font-weight: 600;
        height: 44px;
        padding: 0 36px;
        border-radius: 8px;
        font-size: 15px;
        box-shadow: 0 4px 12px rgba(0, 217, 169, 0.3);

        &:hover {
          background: #01c49b;
          border-color: #01c49b;
          box-shadow: 0 6px 16px rgba(0, 217, 169, 0.4);
        }
      }

      .ant-btn-default {
        height: 44px;
        padding: 0 36px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 500;
        border: 1px solid #d9d9d9;

        &:hover {
          border-color: #00d9a9;
          color: #00d9a9;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .job-summary-card {
      .metrics-row {
        grid-template-columns: 1fr;
      }
    }

    .profiles-section {
      .profiles-header {
        flex-direction: column;
        align-items: flex-start;

        .action-buttons {
          width: 100%;
          flex-direction: column;

          button {
            width: 100%;
          }
        }
      }

      .profiles-table-card {
        .ant-table {
          font-size: 12px;
        }
      }
    }

    .bench-pool-modal,
    .add-resource-modal {
      .ant-modal {
        max-width: 100%;
        margin: 0;
        top: 0;
      }

      .ant-modal-body {
        padding: 20px;
      }

      .modal-content {
        .bench-table {
          .ant-table {
            font-size: 12px;

            .ant-table-thead > tr > th,
            .ant-table-tbody > tr > td {
              padding: 12px 8px;
            }
          }
        }

        .selected-section {
          padding: 16px;
        }

        .modal-footer {
          .add-resource-btn-modal {
            width: 100%;
          }
        }
      }

      .ant-form {
        .ant-row {
          margin: 0;
        }

        .ant-col {
          padding: 0 4px;
        }

        .ant-btn-primary,
        .ant-btn-default {
          width: 100%;
          margin-top: 8px;
        }
      }
    }
  }
`;
