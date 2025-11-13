import styled from "styled-components";

export const TimesheetContainer = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #014c75;
    margin: 0 0 8px 0;
  }

  p {
    color: #666;
    margin: 0;
    font-size: 14px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  .left-section {
    flex: 1;
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .upload-button {
    background: #00d9a9;
    border: none;
    color: white;
    font-weight: 500;
    height: 40px;
    padding: 0 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0, 217, 169, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: #01c49b;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 217, 169, 0.3);
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .ant-table {
    font-size: 14px;

    .ant-table-thead > tr > th {
      background: #f8f9fd;
      color: #014c75;
      font-weight: 600;
      border-bottom: 2px solid #e0e0e0;
      padding: 16px;
    }

    .ant-table-tbody > tr > td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .ant-table-tbody > tr:hover > td {
      background: #f8f9fd;
    }
  }

  .talent-name {
    color: #014c75;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #00d9a9;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  .ant-empty-description {
    color: #666;
    font-size: 14px;
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
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
