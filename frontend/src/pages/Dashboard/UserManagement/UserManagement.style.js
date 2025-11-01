import styled from "styled-components";

export const UserManagementWrapper = styled.div`
  padding: 40px 48px;
  background: #f8f9fd;
  min-height: 100vh;

  .title-header {
    font-family: Quicksand;
    font-weight: 600;
    font-size: 28px;
    line-height: 37.5px;
    letter-spacing: 0%;
    color: #014c75;
    margin-bottom: 28px;
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

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;

  .metric-card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .ant-card-body {
      padding: 24px;
    }

    .metric-content {
      display: flex;
      align-items: center;
      gap: 20px;

      .metric-icon {
        flex-shrink: 0;

        .anticon {
          font-size: 32px;
          color: #014c75;
        }
      }

      .metric-info {
        h3 {
          font-size: 32px;
          font-weight: 700;
          color: #014c75;
          margin: 0 0 4px 0;
          line-height: 1;
        }

        p {
          font-size: 14px;
          color: #8c8c8c;
          margin: 0;
          font-weight: 500;
        }
      }
    }
  }
`;
