import styled from "styled-components";

export const FinanceContainer = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #014c75;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: #8c8c8c;
    margin-top: 4px;
  }
`;

export const MetricsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 14px 16px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #00d9a9;
  }

  .metric-label {
    font-size: 13px;
    color: #8c8c8c;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .metric-value {
    font-size: 24px;
    font-weight: 700;
    color: #014c75;
    margin: 0;
  }

  .metric-change {
    font-size: 12px;
    margin-top: 4px;
    
    &.positive {
      color: #52c41a;
    }
    
    &.negative {
      color: #ff4d4f;
    }
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    color: #014c75;
    font-weight: 600;
    border-bottom: 2px solid #e8e8e8;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f0fdf9;
  }
`;

export const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
`;
