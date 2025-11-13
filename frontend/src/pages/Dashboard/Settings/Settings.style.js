import styled from "styled-components";

export const SettingsContainer = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #014c75;
  }

  p {
    margin: 4px 0 0;
    color: #666;
    font-size: 14px;
  }
`;

export const TabsContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #e8e8e8;

  .tab-button {
    padding: 12px 24px;
    border: none;
    background: transparent;
    color: #666;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    margin-bottom: -2px;

    &:hover {
      color: #014c75;
    }

    &.active {
      color: #014c75;
      border-bottom-color: #00d9a9;
    }
  }
`;

export const ContentSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #014c75;
  }
`;

export const ConfigCard = styled.div`
  background: #f8f9fd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e8e8e8;
`;

export const ConfigRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
    color: #014c75;
  }

  .value {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const TableContainer = styled.div`
  margin-top: 20px;

  .ant-table {
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background: #014c75;
    color: white;
    font-weight: 600;
    border: none;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f0f7ff;
  }
`;
