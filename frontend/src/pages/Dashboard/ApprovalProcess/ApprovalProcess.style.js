import styled from "styled-components";

export const ApprovalProcessWrapper = styled.div`
  .approval-container {
    padding: 24px;
    background: #f8f9fd;
    min-height: 100vh;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: #014c75;
    margin-bottom: 24px;
  }

  .tabs-section {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }

  .tab-button {
    height: 48px;
    padding: 0 24px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 8px;
    border: 2px solid #e8e8e8;
    background: white;
    color: #666;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      border-color: #00d9a9;
      color: #00d9a9;
    }

    &.active {
      background: #00d9a9;
      border-color: #00d9a9;
      color: white;

      .tab-count {
        background: white;
        color: #00d9a9;
      }
    }
  }

  .tab-count {
    background: #00d9a9;
    color: white;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 700;
    min-width: 24px;
    text-align: center;
  }

  .actions-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .left-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .right-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .search-input {
    border-radius: 8px;
    
    .ant-input {
      font-size: 14px;
    }
  }

  .bulk-action-btn {
    height: 40px;
    padding: 0 20px;
    background: #00d9a9;
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: #01c49b;
      color: white;
    }

    .selected-count {
      background: rgba(255, 255, 255, 0.3);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .ant-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .ant-table-thead > tr > th {
      background: #014c75;
      color: white;
      font-weight: 600;
      font-size: 14px;
      border: none;
      padding: 16px 12px;
    }

    .ant-table-tbody > tr > td {
      padding: 12px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
    }

    .ant-table-tbody > tr:hover > td {
      background: #f8f9fd;
    }
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }

  .approve-btn {
    padding: 6px 16px;
    background: #52c41a;
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #389e0d;
      color: white;
    }
  }

  .reject-btn {
    padding: 6px 16px;
    background: #ff4d4f;
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #cf1322;
      color: white;
    }
  }

  .status-tag {
    padding: 4px 12px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 13px;
    display: inline-block;
  }

  .status-pending {
    background: #fff7e6;
    color: #fa8c16;
    border: 1px solid #ffd591;
  }

  .modal-title {
    font-size: 24px;
    font-weight: 700;
    color: #014c75;
    text-align: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e8e8e8;
  }

  .reject-form {
    .ant-form-item-label > label {
      font-weight: 600;
      color: #014c75;
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e8e8e8;
  }
`;
