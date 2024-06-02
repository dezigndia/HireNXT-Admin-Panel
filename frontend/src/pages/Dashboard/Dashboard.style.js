import styled from "styled-components";

export const DashboardWrapper = styled.div`
  .ant-layout {
    height: 100vh;
  }

  .side-navbar {
    background: #272727;
    color: #ffffff;

    .ant-menu-light {
      background: #272727;
      color: #ffffff;

      .ant-menu-item {
        color: #ffffff;
      }

      .ant-menu-item-active {
        .ant-menu-title-content,
        .ant-menu-item-icon {
          color: #00ffb2;
        }
      }

      .ant-menu-item-selected {
        background: #00ffb2;

        .ant-menu-title-content,
        .ant-menu-item-icon {
          color: #191919;
        }
      }
    }
  }
`;
