import styled from "styled-components";

export const OngoingJobsWrapper = styled.div`
  padding: 20px;

  .title-header {
    font-family: Quicksand;
    font-weight: 600;
    font-size: 30px;
    line-height: 37.5px;
    color: #014c75;
    margin-bottom: 32px;
  }

  .search-bar {
    margin-bottom: 20px;
  }

  .job-list-card {
    transition: background 0.2s, border 0.2s;
    cursor: pointer;
    margin-bottom: 16px;

    &:hover {
      background-color: #f0f9ff;
      border-color: #01d9a9;
    }

    &.selected {
      border: 2px solid #014c75;
      background-color: #e6f7ff;
    }
  }

  .job-details-card {
    position: sticky;
    top: 20px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 12px;
  }

  .badge-container {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .ant-badge-status-text {
    font-size: 14px;
  }
`;
