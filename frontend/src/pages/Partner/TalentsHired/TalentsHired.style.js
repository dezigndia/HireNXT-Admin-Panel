import styled from "styled-components";

export const TalentsHiredContainer = styled.div`
  padding: 40px 48px;
  background: #f8f9fd;
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

export const TabsContainer = styled.div`
  margin-bottom: 28px;
  border-bottom: 1px solid #e8e8e8;

  .ant-segmented {
    background: transparent;
    padding: 0;
    border: none;
  }

  .ant-segmented-group {
    background: transparent;
    border: none;
  }

  .ant-segmented-item {
    background: transparent;
    border: none;
    color: #999;
    font-size: 14px;
    font-weight: 500;
    padding: 12px 0;
    margin-right: 40px;
    border-radius: 0;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: transparent;
      transition: background 0.3s;
    }
  }

  .ant-segmented-item-selected {
    background: transparent;
    color: #00d9a9;
    font-weight: 600;

    &::after {
      background: #00d9a9;
    }
  }

  .ant-segmented-thumb {
    display: none;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    color: #014c75;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid #e8e8e8;
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
    background: #f8f9fd;
  }

  .talent-name {
    color: #014c75;
    font-weight: 600;
    font-size: 14px;
  }

  .email-text {
    color: #666;
    font-size: 14px;
  }

  .client-text {
    color: #333;
    font-weight: 500;
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

  .commission-text {
    color: #00d9a9;
    font-weight: 600;
    font-size: 14px;
  }

  .days-left {
    font-weight: 600;
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
      color: #014c75;

      &:hover {
        background: #e6fff9;
        color: #00d9a9;
      }
    }
  }

  .ant-table-pagination {
    padding: 16px 20px;

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
