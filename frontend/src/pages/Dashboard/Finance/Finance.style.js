import styled from "styled-components";

export const FinanceContainer = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
    font-weight: 600;
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

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FiltersRow = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;

  .ant-input-affix-wrapper {
    width: 300px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;

    &:focus,
    &:hover {
      border-color: #00d9a9;
    }

    .ant-input {
      height: 38px;
    }
  }

  .ant-select {
    min-width: 150px;
    height: 40px;

    .ant-select-selector {
      border-radius: 6px !important;
      height: 40px !important;
      border: 1px solid #e0e0e0 !important;
      display: flex;
      align-items: center;

      &:focus,
      &:hover {
        border-color: #00d9a9 !important;
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

export const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const InsightCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e8e8e8;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 16px;
  }

  .insight-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .insight-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .label {
      font-size: 14px;
      color: #595959;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #014c75;
    }
  }
`;
