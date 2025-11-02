import styled from "styled-components";

export const JobDetailsWrapper = styled.div`
  padding: 40px 48px;
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

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h2 {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #014c75;
      }
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
          font-size: 14px;
          color: #262626;
          font-weight: 500;
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
        color: #262626;
        margin-right: 8px;
      }
    }

    .job-description {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;

      h4 {
        font-size: 14px;
        font-weight: 600;
        color: #262626;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #595959;
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  .profiles-table-card {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #014c75;
      margin-bottom: 16px;
    }

    .ant-table {
      .ant-table-thead > tr > th {
        background: #014c75;
        color: white;
        font-weight: 600;
        border-bottom: none;
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

    .profiles-table-card {
      .ant-table {
        font-size: 12px;
      }
    }
  }
`;
