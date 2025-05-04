import styled from "styled-components";

export const PostNewJobWrapper = styled.div`
  .ant-steps
    .ant-steps-item
    .ant-steps-item-container
    .ant-steps-item-title::after {
    display: none;
  }

  .ant-steps .ant-steps-item .ant-steps-item-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    border: 1px solid #e3e3e3;
  }

  .ant-steps.ant-steps-horizontal:not(.ant-steps-label-vertical)
    .ant-steps-item {
    padding-inline-start: 0;
  }

  .ant-steps .ant-steps-item-active {
    background-color: #014c75;
    border-radius: 5px;
  }

  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: #01d9a9;
  }

  .ant-steps
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #fff;
  }

  .step-body {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
  }
`;
