import styled from "styled-components";

export const UserManagementWrapper = styled.div`
  .title-header {
    font-family: Quicksand;
    font-weight: 600;
    font-size: 30px;
    line-height: 37.5px;
    letter-spacing: 0%;
    color: #014c75;
    margin-bottom: 32px;
  }

  .tab-button {
    font-weight: 800;
    font-size: 30px;
    width: 357px;
    height: 88px;
    border-radius: 10px;
    border-width: 3px;
    background: white;
    box-shadow: 0px 0px 5px 0px #0000000d;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .icon-bg {
    background-color: #ffffff;
    padding: 8px;
  }

  .active-tab,
  .ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover {
    border: 3px solid #014c75;
    color: #014c75;
    background: linear-gradient(180deg, #00ffb2 0%, #01d9a9 100%);
  }

  .ant-table-thead .ant-table-cell {
    border-bottom: 1px solid #6c6c6c;
  }

  .ant-table-tbody > tr > td:nth-child(2) {
    color: #014c75;
    font-weight: bold;
  }

  .ant-table-tbody > tr > td:nth-child(4),
  .ant-table-tbody > tr > td:nth-child(5),
  .ant-table-tbody > tr > td:nth-child(6) {
    font-weight: bold;
  }
`;
