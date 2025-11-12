import styled from "styled-components";

export const TimesheetContainer = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #014c75;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const MetricsCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .metric-value {
    font-size: 28px;
    font-weight: 700;
    color: #014c75;
    margin-bottom: 8px;
  }

  .metric-label {
    font-size: 14px;
    color: #666;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 0;

  .tab-button {
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 0;
    background: transparent;
    color: #666;
    font-weight: 500;
    height: 40px;
    padding: 0 16px;
    transition: all 0.3s;

    &:hover {
      color: #00d9a9;
      background: transparent;
    }

    &.active {
      color: #00d9a9;
      border-bottom-color: #00d9a9;
      background: transparent;
    }
  }
`;

export const FiltersContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const TableContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .ant-table-thead > tr > th {
    background: #f8f9fd;
    color: #014c75;
    font-weight: 600;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '8px'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;
