import styled from "styled-components";

export const PartnerDashboardWrapper = styled.div`
  .ant-layout {
    height: 100vh;
  }

  .side-navbar {
    background: #272727;
    color: #ffffff;

    .ant-layout-sider-children {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

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
