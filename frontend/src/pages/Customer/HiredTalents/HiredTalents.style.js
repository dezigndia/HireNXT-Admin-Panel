import styled from "styled-components";

export const HiredTalentsContainer = styled.div`
  padding: 40px 48px;
  background: #f8f9fa;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  margin-bottom: 28px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #014c75;
    margin: 0 0 20px 0;
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
          font-size: 28px;
          color: #014c75;
        }
      }

      .metric-info {
        h3 {
          font-size: 24px;
          font-weight: 700;
          color: #014c75;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        p {
          font-size: 13px;
          color: #8c8c8c;
          margin: 0;
          font-weight: 500;
        }
      }
    }
  }
`;

export const TabsContainer = styled.div`
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

      &:hover {
        background: #01c49b;
        border-color: #01c49b;
        color: white;
      }
    }
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  overflow: hidden;

  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    color: #666;
    font-weight: 600;
    font-size: 13px;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 20px;
    text-align: left;

    &::before {
      display: none;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 20px 20px;
    border-bottom: 1px solid #f5f5f5;
    color: #333;
    font-size: 14px;
    vertical-align: middle;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }

  .ant-table-tbody > tr:hover > td {
    background: #fafafa;
  }

  .talent-name {
    color: #1890ff;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #40a9ff;
      text-decoration: underline;
    }
  }

  .email-text {
    color: #666;
    font-size: 14px;
  }

  .date-text {
    color: #333;
    font-size: 14px;
  }

  .duration-text {
    color: #333;
    font-size: 14px;
  }

  .rate-text {
    color: #333;
    font-weight: 500;
    font-size: 14px;
  }

  .days-left {
    font-weight: 500;
    font-size: 14px;

    &.critical {
      color: #f5222d;
    }

    &.warning {
      color: #fa8c16;
    }

    &.safe {
      color: #52c41a;
    }

    &.inactive {
      color: #999;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-size: 16px;

    &.menu-btn {
      background: #f5f5f5;
      color: #999;

      &:hover {
        background: #e8e8e8;
        color: #666;
      }
    }
  }

  .ant-table-pagination {
    padding: 16px 20px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #999;

  .ant-empty-description {
    color: #999;
    font-size: 14px;
  }
`;
