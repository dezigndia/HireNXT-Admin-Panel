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
  }
`;
