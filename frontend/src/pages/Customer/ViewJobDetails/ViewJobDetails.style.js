import styled from "styled-components";

export const ViewJobDetailsWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;

  .header {
    margin-bottom: 24px;

    .back-button {
      margin-bottom: 12px;
      color: #595959;
      font-weight: 500;
      padding-left: 0;

      &:hover {
        color: #1890ff;
      }
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: #014c75;
    }
  }

  .job-details-card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;

    .ant-card-body {
      padding: 32px;
    }

    .job-header-section {
      .job-title-row {
        .job-id {
          font-size: 12px;
          color: #8c8c8c;
          margin-bottom: 8px;
        }

        .job-title {
          font-size: 28px;
          font-weight: 700;
          color: #014c75;
          margin: 0 0 16px 0;
        }

        .company-info {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      }
    }

    .job-info-grid {
      .info-item {
        display: flex;
        align-items: center;
        gap: 12px;

        .info-icon {
          font-size: 20px;
          color: #00d9a9;
        }

        .info-content {
          display: flex;
          flex-direction: column;

          .info-label {
            font-size: 12px;
            color: #8c8c8c;
          }

          .info-value {
            font-size: 14px;
            font-weight: 600;
            color: #262626;
          }
        }
      }
    }

    .metrics-section {
      .metric-box {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #fafafa;
        border-radius: 8px;

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
            font-size: 20px;
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

    .skills-section {
      .skills-group {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          font-size: 14px;
          font-weight: 600;
          color: #014c75;
          margin: 0 0 12px 0;
        }

        .skill-tag {
          padding: 4px 12px;
          font-size: 13px;
          border-radius: 4px;
        }
      }
    }

    .additional-info {
      .info-box {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .label {
          font-size: 12px;
          color: #8c8c8c;
        }
      }
    }

    .description-section {
      h4 {
        font-size: 16px;
        font-weight: 600;
        color: #014c75;
        margin: 0 0 16px 0;
      }

      .description-content {
        p {
          font-size: 14px;
          line-height: 1.8;
          color: #595959;
          margin: 0 0 12px 0;
          white-space: pre-wrap;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .job-details-card {
      .ant-card-body {
        padding: 20px;
      }

      .job-header-section {
        .job-title-row {
          .job-title {
            font-size: 22px;
          }
        }
      }

      .metrics-section {
        .metric-box {
          padding: 12px;

          .metric-info {
            h3 {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
`;
