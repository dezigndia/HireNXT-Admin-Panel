import styled from "styled-components";

export const TalentDetailsWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    .back-button {
      font-size: 16px;
      color: #1890ff;
      display: flex;
      align-items: center;
      gap: 8px;
      
      &:hover {
        color: #40a9ff;
      }
    }

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
  }

  .profile-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;

    .profile-header {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f0f0f0;

      .avatar-section {
        .talent-avatar {
          width: 100px;
          height: 100px;
          font-size: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      }

      .info-section {
        flex: 1;

        h1 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .role {
          font-size: 18px;
          color: #666;
          margin-bottom: 8px;
        }

        .verification-badges {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .meta-info {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          color: #666;

          .info-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;

            .anticon {
              color: #1890ff;
            }
          }
        }
      }

      .action-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 180px;
      }
    }

    .details-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      margin-top: 24px;

      .detail-item {
        h4 {
          font-size: 12px;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-weight: 500;
        }

        p {
          font-size: 16px;
          color: #333;
          font-weight: 500;
          margin: 0;

          &.highlight {
            color: #1890ff;
            font-size: 20px;
          }
        }
      }
    }
  }

  .skills-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .projects-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    .project-item {
      padding: 20px;
      border: 1px solid #f0f0f0;
      border-radius: 6px;
      margin-bottom: 16px;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .project-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
        font-size: 14px;
        color: #666;

        span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      }

      p {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 12px;
      }

      .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
    }
  }

  .summary-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    p {
      font-size: 14px;
      color: #666;
      line-height: 1.8;
    }
  }

  @media (max-width: 768px) {
    .profile-card .profile-header {
      flex-direction: column;

      .action-section {
        width: 100%;
      }
    }

    .details-row {
      grid-template-columns: 1fr;
    }
  }
`;
