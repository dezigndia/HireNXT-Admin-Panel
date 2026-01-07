import styled from "styled-components";

export const JobDetailsWrapper = styled.div`
  padding: 20px;

  .title-header {
    font-family: Quicksand;
    font-weight: 600;
    font-size: 30px;
    line-height: 37.5px;
    color: #014c75;
    margin-bottom: 32px;
  }

  .detail-card {
    margin-bottom: 16px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  }

  .section-header {
    font-size: 18px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e4e7eb;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .info-label {
    font-weight: 600;
    color: #6c6c6c;
  }

  .info-value {
    color: #191919;
  }

  .badge-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 12px;
  }
`;
