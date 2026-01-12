import styled from "styled-components";

export const OverviewWrapper = styled.div`
  padding: 24px;
  background-color: #f8f9fd;

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 24px;
  }

  .approval-item {
    &:hover {
      background-color: #f5f5f5;
    }
  }

  .ant-card {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-card-head-title {
    font-weight: 600;
    color: #014c75;
    font-size: 16px;
  }

  .ant-table {
    .ant-table-thead > tr > th {
      background-color: #fafafa;
      color: #666;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 1px solid #f0f0f0;
    }

    .ant-table-tbody > tr > td {
      font-size: 14px;
      color: #333;
    }

    .ant-table-tbody > tr:hover > td {
      background-color: #f5f5f5;
    }
  }
`;
