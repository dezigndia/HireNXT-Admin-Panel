import styled from "styled-components";

export const OngoingJobsWrapper = styled.div`
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background: #f8f9fd;

  .search-section {
    padding: 24px 16px 0 16px;
    width: 100%;

    .ant-input-search {
      .ant-input {
        border-radius: 8px;
        border: 1px solid #d9d9d9;
        font-size: 14px;
        
        &:focus {
          border-color: #00d9a9;
          box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1);
        }
      }

      .ant-input-search-button {
        background: #00d9a9;
        border-color: #00d9a9;
        
        &:hover {
          background: #01c49b;
          border-color: #01c49b;
        }
      }
    }
  }

  .content-section {
    margin: 0;
    width: 100%;
    padding: 24px 16px;
  }

  .jobs-list-column {
    width: 100%;
    max-width: 100%;
    margin-bottom: 24px;

    .jobs-scroll-container {
      max-height: 85vh;
      overflow-y: auto;
      width: 100%;
      padding-right: 8px;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 3px;
        
        &:hover {
          background: #999;
        }
      }
    }

    .job-list-card {
      margin-bottom: 16px;
      border-radius: 8px;
      border: 1px solid #e8e8e8;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
      }

      &.selected {
        border-color: #00d9a9;
        background: #e6fff9;
        box-shadow: 0 2px 8px rgba(0, 217, 169, 0.2);
      }

      .ant-card-body {
        padding: 16px;
      }

      .info-row {
        margin-bottom: 8px;

        .ant-typography {
          font-size: 13px;
          color: #595959;
        }

        .anticon {
          color: #00d9a9;
          margin-right: 4px;
        }
      }

      .title-row {
        margin-top: 8px;
        margin-bottom: 8px;

        .ant-typography {
          color: #014c75;
          font-weight: 600;
          font-size: 15px;
        }
      }

      .employment-row {
        margin-top: 8px;

        .ant-tag {
          border-radius: 4px;
          font-size: 12px;
        }

        .ant-badge {
          .ant-badge-status-text {
            font-size: 13px;
            color: #262626;
          }
        }
      }

      .skills-row {
        margin-top: 8px;

        .ant-tag {
          margin-bottom: 4px;
          border-radius: 4px;
          font-size: 12px;
        }
      }
    }
  }

  .job-details-column {
    width: 100%;
    max-width: 100%;

    .details-card {
      min-height: 200px;
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e8e8e8;

      .ant-card-body {
        padding: 24px;
      }

      .job-id-row {
        margin-bottom: 12px;

        .ant-typography {
          font-size: 14px;
          color: #595959;

          &.ant-typography-strong {
            color: #014c75;
          }
        }

        .ant-tag {
          border-radius: 4px;
        }

        .anticon {
          color: #00d9a9;
          margin-right: 4px;
        }
      }

      .ant-divider {
        margin: 12px 0;
      }

      .title-row {
        margin-bottom: 12px;

        h4 {
          color: #014c75;
          font-weight: 700;
          margin: 0;
        }
      }

      .badges-row {
        margin-bottom: 12px;

        .ant-badge {
          .ant-badge-status-text {
            font-size: 14px;
            color: #262626;
          }
        }

        .anticon {
          margin-right: 4px;
        }
      }

      .skills-section {
        margin-bottom: 12px;

        .ant-typography-strong {
          color: #014c75;
          font-size: 14px;
        }

        .ant-tag {
          margin-bottom: 4px;
          border-radius: 4px;
        }
      }

      .info-grid {
        margin-bottom: 12px;

        .ant-typography {
          font-size: 14px;
          color: #595959;
        }

        .anticon {
          color: #00d9a9;
          margin-right: 4px;
        }

        .ant-tag {
          border-radius: 4px;
        }
      }

      .description-section {
        .ant-typography-strong {
          color: #014c75;
          font-size: 14px;
        }

        ul {
          margin-top: 8px;
          padding-left: 20px;

          li {
            margin-bottom: 8px;
            color: #595959;
            line-height: 1.6;
          }
        }
      }

      .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }
    }
  }

  @media (max-width: 768px) {
    .jobs-list-column {
      .jobs-scroll-container {
        max-height: 50vh;
      }
    }
  }
`;
