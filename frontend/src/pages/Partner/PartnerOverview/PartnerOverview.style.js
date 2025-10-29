import styled from "styled-components";

export const OverviewWrapper = styled.div`
  padding: 20px 0;
  background-color: #f8f9fd;

  .page-title {
    color: #014c75;
    margin-bottom: 0;
  }

  .account-alert {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 8px;
    
    .ant-alert-message {
      color: #014c75;
      font-size: 14px;
    }
  }

  .metric-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #e8e8e8;
    margin-bottom: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .ant-card-body {
      padding: 20px 16px;
    }
  }

  .metric-content {
    display: flex;
    align-items: center;
    gap: 12px;

    .metric-icon {
      font-size: 32px;
      color: #00d9a9;
      background: #e6fff9;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .metric-count {
      margin: 0;
      color: #014c75;
      font-size: 28px;
      font-weight: 600;
    }

    .metric-label {
      color: #666;
      font-size: 13px;
      display: block;
      margin-top: -4px;
    }

    .arrow-icon {
      margin-left: auto;
      color: #ccc;
      font-size: 16px;
    }
  }

  .hero-section {
    background: linear-gradient(135deg, #00d9a9 0%, #01c49b 100%);
    border-radius: 12px;
    padding: 48px 32px;
    margin: 30px 0;
    text-align: center;

    .hero-title {
      color: white;
      font-size: 24px;
      margin-bottom: 24px;
      font-weight: 500;

      .highlight {
        font-weight: 700;
      }
    }

    .hero-search {
      max-width: 600px;
      margin: 0 auto;
      border-radius: 8px;
      background: white;

      .ant-input {
        font-size: 14px;
      }

      .ant-input-prefix {
        color: #999;
      }
    }
  }

  .quick-action-section {
    margin: 40px 0;

    .section-title {
      color: #014c75;
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }

    .action-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e8e8e8;
      height: 100%;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
      }

      .ant-card-body {
        padding: 24px;
      }
    }

    .action-icon-wrapper {
      font-size: 48px;
      color: #00d9a9;
      margin-bottom: 16px;
      
      svg {
        width: 48px;
        height: 48px;
      }
    }

    .action-title {
      color: #014c75;
      font-size: 16px;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .action-description {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      min-height: 60px;
    }

    .action-link {
      color: #00d9a9;
      padding: 0;
      font-weight: 500;
      font-size: 14px;

      &:hover {
        color: #01c49b;
      }
    }
  }

  .about-section {
    margin: 40px 0;

    .section-title {
      color: #014c75;
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }

    .about-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e8e8e8;
      height: 100%;

      .ant-card-body {
        padding: 24px;
      }

      h5 {
        color: #014c75;
        font-size: 16px;
        margin-bottom: 16px;
        font-weight: 600;
      }

      .ant-typography {
        color: #666;
        font-size: 14px;
        line-height: 1.6;
      }

      .tour-text {
        margin-top: 16px;
        margin-bottom: 12px;
      }
    }

    .about-link {
      color: #00d9a9;
      padding: 0;
      font-weight: 500;
      font-size: 14px;

      &:hover {
        color: #01c49b;
      }
    }
  }
`;
