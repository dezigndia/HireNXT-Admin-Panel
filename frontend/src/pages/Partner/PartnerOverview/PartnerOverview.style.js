import styled from "styled-components";

export const OverviewWrapper = styled.div`
  .overview-container {
    padding: 20px 0;
  }

  .account-alert {
    margin-bottom: 24px;
    border-radius: 8px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
  }

  .page-title {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 24px;
  }

  .metrics-row {
    margin-bottom: 32px;
  }

  .metric-card {
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    .ant-card-body {
      padding: 20px;
    }
  }

  .metric-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .metric-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(135deg, #26c6b8 0%, #1ea89a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    flex-shrink: 0;
  }

  .metric-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .metric-count {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
  }

  .metric-label {
    font-size: 13px;
    color: #666;
    margin-top: 4px;
  }

  .arrow-icon {
    color: #d9d9d9;
    font-size: 16px;
    transition: all 0.3s;
  }

  .metric-card:hover .arrow-icon {
    color: #26c6b8;
    transform: translateX(4px);
  }

  .search-section {
    background: linear-gradient(135deg, #26c6b8 0%, #1ea89a 100%);
    border-radius: 16px;
    padding: 48px 40px;
    margin-bottom: 32px;
    text-align: center;
  }

  .search-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .search-title {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.4;

    .highlight {
      font-weight: 700;
    }
  }

  .search-input {
    margin-top: 24px;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 14px;

    .ant-input {
      font-size: 14px;
    }

    .anticon {
      color: #999;
      font-size: 16px;
    }
  }

  .quick-actions-section {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  .action-card {
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    height: 100%;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    .ant-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  .action-icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: #f0f9ff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 28px;
    color: #26c6b8;
  }

  .action-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

  .action-description {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 16px;
    flex: 1;
  }

  .action-link {
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #26c6b8;
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: flex-start;

    &:hover {
      color: #1ea89a;
    }

    .anticon {
      font-size: 12px;
    }
  }

  .about-section {
    margin-bottom: 32px;
  }

  .about-card {
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    height: 100%;

    .ant-card-body {
      padding: 24px;
    }
  }

  .about-card-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .about-card-description {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .about-link {
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #26c6b8;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
      color: #1ea89a;
    }

    .anticon {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .overview-container {
      padding: 16px 0;
    }

    .search-section {
      padding: 32px 24px;
    }

    .search-title {
      font-size: 20px;
    }

    .metric-count {
      font-size: 20px;
    }
  }
`;
