import styled from "styled-components";

export const FindTalentsWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;

  .header {
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: #262626;
    }

    .total-count {
      color: #8c8c8c;
      margin: 8px 0 0 0;
      font-size: 14px;
    }
  }

  .filter-section {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    align-items: center;

    .search-input {
      flex: 1;
      min-width: 250px;
      max-width: 400px;
    }

    .all-filters-btn {
      border-color: #01d9a9;
      color: #01d9a9;

      &:hover {
        border-color: #00bf8f;
        color: #00bf8f;
      }
    }
  }

  .talents-grid {
    margin-top: 24px;
  }

  .talent-card {
    border-radius: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .ant-card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .talent-header {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;

      .talent-avatar {
        background: #01d9a9;
        font-weight: 600;
        flex-shrink: 0;
      }

      .talent-info {
        flex: 1;
        min-width: 0;

        .talent-name {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          color: #262626;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .talent-location {
          font-size: 12px;
          color: #8c8c8c;
          margin: 4px 0 0 0;
          display: flex;
          align-items: center;
          gap: 4px;

          .anticon {
            font-size: 10px;
          }
        }
      }
    }

    .talent-details {
      margin-bottom: 16px;

      .experience {
        font-size: 12px;
        color: #8c8c8c;
        margin: 0 0 8px 0;
      }

      .role {
        font-size: 16px;
        font-weight: 600;
        color: #262626;
        margin: 0 0 12px 0;
      }

      .rate-label {
        font-size: 12px;
        color: #8c8c8c;
        margin: 0;
      }

      .rate {
        font-size: 18px;
        font-weight: 700;
        color: #01d9a9;
        margin: 4px 0 0 0;
      }
    }

    .skills-section {
      margin-bottom: 16px;
      flex: 1;

      .skills-label {
        font-size: 12px;
        color: #8c8c8c;
        margin: 0 0 8px 0;
      }

      .skills-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        .ant-tag {
          margin: 0;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
        }
      }
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: auto;

      .view-details-btn {
        background: #01d9a9;
        border-color: #01d9a9;
        font-weight: 500;

        &:hover {
          background: #00bf8f;
          border-color: #00bf8f;
        }
      }

      .schedule-btn {
        border-color: #01d9a9;
        color: #01d9a9;
        font-weight: 500;

        &:hover {
          border-color: #00bf8f;
          color: #00bf8f;
        }
      }
    }
  }

  .ant-modal {
    .ant-modal-title {
      font-size: 18px;
      font-weight: 600;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #262626;
    }
  }
`;
