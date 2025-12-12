import styled from "styled-components";

export const MyJobsWrapper = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: #014c75;
    }

    .post-job-btn {
      background: #01d9a9;
      border-color: #01d9a9;
      font-weight: 500;

      &:hover {
        background: #00bf8f;
        border-color: #00bf8f;
      }
    }
  }

  .metrics-row {
    margin-bottom: 24px;

    .metric-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: none;

      .ant-card-body {
        padding: 20px;
      }

      .metric-content {
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
          flex: 1;

          .metric-value {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            color: #262626;
          }

          .metric-label {
            font-size: 14px;
            color: #8c8c8c;
            margin: 4px 0 0 0;
          }
        }
      }
    }
  }

  .tabs-section {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    border-bottom: 2px solid #e8e8e8;
    padding-bottom: 0;

    .tab-button {
      padding: 12px 24px;
      border: none;
      background: transparent;
      color: #666;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      margin-bottom: -2px;
      height: auto;
      border-radius: 0;
      box-shadow: none;

      &:hover {
        color: #014c75;
        background: transparent;
      }

      &.active {
        color: #014c75;
        border-bottom-color: #00d9a9;
        background: transparent;
      }
    }
  }

  .empty-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;
  }

  .jobs-list {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .job-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: none;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }

      .ant-card-body {
        padding: 20px;
      }

      .job-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 16px;

        .job-title-section {
          flex: 1;
          min-width: 0;

          .job-id {
            font-size: 12px;
            color: #8c8c8c;
            margin: 0 0 8px 0;
          }

          .job-title {
            font-size: 18px;
            font-weight: 600;
            color: #1890ff;
            margin: 0 0 12px 0;
          }

          .job-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin: 0;

            .experience {
              font-size: 13px;
              color: #595959;
            }
          }
        }

        .job-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;

          .posted-date {
            font-size: 12px;
            color: #8c8c8c;
            white-space: nowrap;
          }

          .action-icon {
            font-size: 20px;
            cursor: pointer;
            color: #595959;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.3s ease;

            &:hover {
              background: #f0f0f0;
              color: #262626;
            }
          }
        }
      }

      .job-stats {
        display: flex;
        align-items: center;
        padding: 16px 0 0 0;
        border-top: 1px solid #f0f0f0;

        .stat-item {
          flex: 1;
          text-align: center;

          h4 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: #262626;
          }

          p {
            font-size: 13px;
            color: #8c8c8c;
            margin: 0;
          }

          &.rejected h4 {
            color: #ff4d4f;
          }

          &.hired h4 {
            color: #52c41a;
          }
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: #f0f0f0;
          margin: 0 8px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .metrics-row {
      .ant-col {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .job-card {
      .job-header {
        flex-direction: column;

        .job-actions {
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }

      .job-stats {
        flex-wrap: wrap;

        .stat-item {
          flex: 1 1 45%;
          margin-bottom: 12px;
        }

        .stat-divider {
          display: none;
        }
      }
    }
  }
`;
