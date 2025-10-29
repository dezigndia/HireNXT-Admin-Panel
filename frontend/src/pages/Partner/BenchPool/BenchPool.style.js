import styled from "styled-components";

export const BenchPoolWrapper = styled.div`
  .bench-pool-container {
    padding: 24px;
    background: #f8f9fd;
    min-height: 100vh;

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #014c75;
      margin-bottom: 24px;
    }

    .metrics-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 24px;

      .metric-card {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: none;
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .ant-card-body {
          padding: 24px;
        }

        .metric-content {
          display: flex;
          align-items: center;
          gap: 20px;

          .metric-icon {
            flex-shrink: 0;

            .anticon {
              font-size: 32px;
              color: #014c75;
            }
          }

          .metric-info {
            h3 {
              font-size: 32px;
              font-weight: 700;
              color: #014c75;
              margin: 0 0 4px 0;
              line-height: 1;
            }

            p {
              font-size: 14px;
              color: #8c8c8c;
              margin: 0;
              font-weight: 500;
            }
          }
        }
      }
    }

    .tabs-section {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;

      .tab-button {
        height: 48px;
        padding: 0 24px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
        border: 2px solid #d9d9d9;
        background: white;
        color: #595959;
        transition: all 0.3s ease;

        &:hover {
          border-color: #00d9a9;
          color: #00d9a9;
        }

        &.active {
          background: #00d9a9;
          border-color: #00d9a9;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 217, 169, 0.3);

          &:hover {
            background: #01c49b;
            border-color: #01c49b;
          }
        }
      }
    }

    .actions-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 16px;
      flex-wrap: wrap;

      .left-actions {
        display: flex;
        gap: 12px;
        flex: 1;
        max-width: 600px;

        .search-input {
          flex: 1;
          min-width: 250px;

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

              &::placeholder {
                color: #bfbfbf;
              }
            }

            .ant-input-prefix {
              margin-right: 12px;
              color: #8c8c8c;
            }
          }
        }

        .filter-select {
          .ant-select-selector {
            border-radius: 8px !important;
            border: 1px solid #d9d9d9 !important;
            height: 44px !important;
            padding: 8px 16px !important;

            &:hover {
              border-color: #00d9a9 !important;
            }

            .ant-select-selection-placeholder {
              color: #bfbfbf;
              line-height: 28px;
            }
          }

          &.ant-select-focused .ant-select-selector {
            border-color: #00d9a9 !important;
            box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1) !important;
          }
        }
      }

      .right-actions {
        display: flex;
        gap: 12px;

        .change-status-btn {
          border-color: #014c75;
          color: #014c75;
          font-weight: 600;
          height: 44px;
          padding: 0 24px;
          border-radius: 8px;

          &:hover {
            background: #e6f0f7;
            border-color: #013a5a;
            color: #013a5a;
          }
        }

        .add-resource-btn {
          background: #00d9a9;
          border-color: #00d9a9;
          color: white;
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

    .table-card {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: none;

      .ant-card-body {
        padding: 0;
      }

      .ant-table {
        .ant-table-thead > tr > th {
          background: #fafafa;
          font-weight: 600;
          color: #014c75;
          font-size: 14px;
          border-bottom: 2px solid #e8e8e8;
          padding: 16px;

          &.ant-table-selection-column {
            padding-left: 24px;
          }
        }

        .ant-table-tbody > tr {
          transition: all 0.3s;

          td {
            padding: 16px;

            &.ant-table-selection-column {
              padding-left: 24px;
            }
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

        .ant-pagination {
          margin: 24px;
          
          .ant-pagination-item-active {
            border-color: #00d9a9;
            background: #00d9a9;

            a {
              color: white;
            }
          }

          .ant-pagination-item:hover {
            border-color: #00d9a9;

            a {
              color: #00d9a9;
            }
          }
        }
      }
    }
  }

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
    .bench-pool-container {
      padding: 16px;

      .page-title {
        font-size: 24px;
      }

      .metrics-section {
        grid-template-columns: 1fr;
      }

      .tabs-section {
        flex-direction: column;

        .tab-button {
          width: 100%;
        }
      }

      .actions-section {
        flex-direction: column;
        align-items: stretch;

        .left-actions {
          flex-direction: column;
          max-width: 100%;

          .search-input,
          .filter-select {
            width: 100%;
          }
        }

        .right-actions {
          flex-direction: column;

          .change-status-btn,
          .add-resource-btn {
            width: 100%;
          }
        }
      }

      .table-card {
        .ant-table {
          font-size: 12px;

          .ant-table-thead > tr > th,
          .ant-table-tbody > tr > td {
            padding: 12px 8px;
          }
        }
      }
    }

    .add-resource-modal {
      .ant-modal {
        max-width: 100%;
        margin: 0;
        top: 0;
      }

      .ant-modal-body {
        padding: 20px;
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
