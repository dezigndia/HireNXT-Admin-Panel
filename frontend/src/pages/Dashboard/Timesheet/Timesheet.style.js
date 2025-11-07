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

  .search-input {
    width: 300px;
    height: 40px;

    .ant-input {
      border-radius: 6px;
      border: 1px solid #e0e0e0;

      &:focus {
        border-color: #00d9a9;
        box-shadow: 0 0 0 2px rgba(0, 217, 169, 0.1);
      }
    }
  }

  .filter-select {
    width: 180px;
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
  background: white;
  border-radius: 8px;
  padding: 16px 24px 0;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .ant-segmented {
    background: #f8f9fd;
    padding: 4px;
    border-radius: 6px;

    .ant-segmented-item {
      border-radius: 4px;
      padding: 8px 24px;
      font-weight: 500;
      color: #666;
      transition: all 0.3s ease;

      &:hover {
        color: #014c75;
      }
    }

    .ant-segmented-item-selected {
      background: white;
      color: #014c75;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
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

      &:first-child {
        border-top-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
      }
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

  .status-badge {
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    display: inline-block;

    &.pending {
      background: #fff3cd;
      color: #856404;
    }

    &.submitted {
      background: #cfe2ff;
      color: #084298;
    }

    &.approved {
      background: #d1e7dd;
      color: #0f5132;
    }

    &.rejected {
      background: #f8d7da;
      color: #842029;
    }
  }

  .amount-text {
    color: #014c75;
    font-weight: 600;
  }

  .date-text {
    color: #666;
  }

  .icon-button {
    background: transparent;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background: #f8f9fd;
      color: #014c75;
    }

    &.menu-btn {
      font-size: 18px;
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

export const UploadModal = styled.div`
  .upload-section {
    margin: 24px 0;
  }

  .upload-area {
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    background: #fafafa;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #00d9a9;
      background: #f8f9fd;
    }

    &.active {
      border-color: #00d9a9;
      background: #f0fff9;
    }
  }

  .upload-icon {
    font-size: 48px;
    color: #00d9a9;
    margin-bottom: 16px;
  }

  .upload-text {
    margin-bottom: 8px;
    font-size: 16px;
    color: #014c75;
    font-weight: 500;
  }

  .upload-hint {
    color: #999;
    font-size: 14px;
  }

  .file-info {
    margin-top: 16px;
    padding: 12px 16px;
    background: #f8f9fd;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .file-name {
      color: #014c75;
      font-weight: 500;
    }

    .remove-btn {
      color: #ff4d4f;
      cursor: pointer;
      font-size: 12px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .form-group {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 8px;
      color: #014c75;
      font-weight: 500;
    }
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

export const MetricCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
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
    margin-bottom: 12px;

    .metric-label {
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    .metric-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;

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
    font-size: 28px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 4px;
  }

  .metric-subtext {
    color: #999;
    font-size: 12px;
  }
`;
