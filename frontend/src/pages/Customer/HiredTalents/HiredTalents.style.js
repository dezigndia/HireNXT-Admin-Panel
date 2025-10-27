import styled from "styled-components";

export const HiredTalentsContainer = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 24px 0;
  }
`;

export const TabsContainer = styled.div`
  margin-bottom: 24px;

  .ant-segmented {
    background: transparent;
    padding: 0;
  }

  .ant-segmented-item {
    background: transparent;
    border: none;
    color: #999;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
    margin-right: 32px;
    border-radius: 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: transparent;
    }
  }

  .ant-segmented-item-selected {
    background: transparent;
    color: #26c6b8;
    font-weight: 600;

    &::after {
      background: #26c6b8;
    }
  }

  .ant-segmented-thumb {
    display: none;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    background: white;
    color: #666;
    font-weight: 600;
    font-size: 13px;
    border-bottom: 2px solid #f0f0f0;
    padding: 16px 12px;

    &::before {
      display: none;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 20px 12px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
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
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;

    &.active {
      background: #e6f7f1;
      color: #00a86b;
    }

    &.inactive {
      background: #fff3e0;
      color: #ff9800;
    }

    &.warning {
      background: #ffebee;
      color: #f44336;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #f0f0f0;
    border: none;
    color: #666;
    transition: all 0.2s;

    &:hover {
      background: #e0e0e0;
    }
  }

  .rate-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .current-rate {
      color: #333;
      font-weight: 500;
    }

    .market-rate {
      color: #999;
      font-size: 12px;
    }
  }

  .days-left {
    font-weight: 500;

    &.critical {
      color: #f44336;
    }

    &.warning {
      color: #ff9800;
    }

    &.safe {
      color: #00a86b;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;

  .ant-empty-description {
    color: #999;
    font-size: 14px;
  }
`;
