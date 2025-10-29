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

    .filters-container {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

      .filter-title {
        font-weight: 600;
        color: #014c75;
        margin-bottom: 12px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;

        .anticon {
          color: #00d9a9;
        }
      }

      .filters-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;

        .ant-select {
          .ant-select-selector {
            border-radius: 6px;
            
            &:hover {
              border-color: #00d9a9;
            }
          }

          &.ant-select-focused .ant-select-selector {
            border-color: #00d9a9;
            box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1);
          }
        }

        .ant-btn-link {
          color: #ff4d4f;
          font-weight: 500;
          
          &:hover {
            color: #ff7875;
          }
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

        .salary-badge {
          background: linear-gradient(135deg, #00d9a9 0%, #01c49b 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 4px rgba(0, 217, 169, 0.3);

          .anticon {
            font-size: 14px;
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

        .salary-highlight {
          background: linear-gradient(135deg, #00d9a9 0%, #01c49b 100%);
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0, 217, 169, 0.3);

          .anticon {
            font-size: 18px;
          }
        }

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

      .submit-profiles-btn {
        background: #00d9a9;
        border-color: #00d9a9;
        font-weight: 600;
        height: 44px;
        padding: 0 32px;
        font-size: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 217, 169, 0.3);

        &:hover {
          background: #01c49b;
          border-color: #01c49b;
          box-shadow: 0 6px 16px rgba(0, 217, 169, 0.4);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
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
    .search-section {
      .filters-container {
        .filters-row {
          .ant-select {
            width: 100% !important;
            min-width: auto;
          }
        }
      }
    }

    .jobs-list-column {
      .jobs-scroll-container {
        max-height: 50vh;
      }
    }
  }
`;
