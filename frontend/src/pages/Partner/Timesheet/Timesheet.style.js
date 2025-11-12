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

export const MetricCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 14px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .metric-label {
      color: #666;
      font-size: 13px;
      font-weight: 500;
    }

    .metric-icon {
      width: 34px;
      height: 34px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;

      &.primary {
        background: rgba(0, 217, 169, 0.1);
        color: #00d9a9;
      }

      &.secondary {
        background: rgba(1, 76, 117, 0.1);
        color: #014c75;
      }

      &.warning {
        background: rgba(255, 193, 7, 0.1);
        color: #ffc107;
      }

      &.success {
        background: rgba(40, 167, 69, 0.1);
        color: #28a745;
      }
    }
  }

  .metric-value {
    font-size: 24px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 3px;
  }

  .metric-subtext {
    color: #999;
    font-size: 11px;
  }
`;
