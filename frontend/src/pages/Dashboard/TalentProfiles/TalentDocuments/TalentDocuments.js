import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Tag, Empty } from "antd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import styled from "styled-components";

const TalentDocumentsWrapper = styled.div`
  padding: 24px;
  background: #f8f9fd;
  min-height: 100vh;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #014c75;
    margin: 0 0 24px 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    .back-button {
      font-size: 14px;
      color: #014c75;
      
      &:hover {
        color: #00d9a9;
      }
    }
  }

  .talent-info {
    background: white;
    padding: 20px 24px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info-left {
      h3 {
        margin: 0 0 4px 0;
        font-size: 20px;
        color: #014c75;
      }

      p {
        margin: 0;
        color: #666;
      }
    }
  }

  .documents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }

  .document-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;

    .card-header {
      background: #f8f9fd;
      padding: 16px 20px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .doc-title {
        display: flex;
        align-items: center;
        gap: 12px;

        .anticon {
          font-size: 24px;
          color: #014c75;
        }

        h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
      }
    }

    .card-body {
      padding: 24px 20px;

      .doc-preview {
        background: #f8f9fd;
        border: 2px dashed #e8e8e8;
        border-radius: 8px;
        height: 180px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        .anticon {
          font-size: 48px;
          color: #bbb;
          margin-bottom: 12px;
        }

        p {
          color: #999;
          margin: 0;
        }
      }

      .doc-info {
        margin-bottom: 20px;

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .label {
            color: #999;
            font-size: 13px;
          }

          .value {
            color: #333;
            font-size: 13px;
            font-weight: 500;
          }
        }
      }

      .doc-actions {
        display: flex;
        gap: 12px;

        .ant-btn {
          flex: 1;
        }
      }
    }
  }
`;

const mockDocuments = {
  1: {
    name: "Rajesh Kumar",
    role: "SAP HANA Developer",
    documents: [
      {
        type: "Resume",
        fileName: "Rajesh_Kumar_Resume.pdf",
        fileSize: "245 KB",
        uploadedOn: "15-Oct-24",
        verified: true,
      },
      {
        type: "Degree Certificate",
        fileName: "BTech_Certificate.pdf",
        fileSize: "1.2 MB",
        uploadedOn: "15-Oct-24",
        verified: true,
      },
      {
        type: "ID Proof (Aadhar Card)",
        fileName: "Aadhar_Card.pdf",
        fileSize: "320 KB",
        uploadedOn: "15-Oct-24",
        verified: true,
      },
    ],
  },
  2: {
    name: "Priya Sharma",
    role: "React Developer",
    documents: [
      {
        type: "Resume",
        fileName: "Priya_Sharma_Resume.pdf",
        fileSize: "198 KB",
        uploadedOn: "18-Oct-24",
        verified: true,
      },
      {
        type: "Degree Certificate",
        fileName: "MCA_Certificate.pdf",
        fileSize: "980 KB",
        uploadedOn: "18-Oct-24",
        verified: true,
      },
      {
        type: "ID Proof (PAN Card)",
        fileName: "PAN_Card.pdf",
        fileSize: "156 KB",
        uploadedOn: "18-Oct-24",
        verified: false,
      },
    ],
  },
};

for (let i = 3; i <= 10; i++) {
  mockDocuments[i] = {
    name: `Developer ${i}`,
    role: "Software Developer",
    documents: [
      {
        type: "Resume",
        fileName: `Developer_${i}_Resume.pdf`,
        fileSize: "220 KB",
        uploadedOn: "20-Oct-24",
        verified: true,
      },
      {
        type: "Degree Certificate",
        fileName: `Degree_Certificate_${i}.pdf`,
        fileSize: "1.1 MB",
        uploadedOn: "20-Oct-24",
        verified: i % 2 === 0,
      },
      {
        type: "ID Proof",
        fileName: `ID_Proof_${i}.pdf`,
        fileSize: "280 KB",
        uploadedOn: "20-Oct-24",
        verified: i % 3 === 0,
      },
    ],
  };
}

const TalentDocuments = () => {
  const { talentId } = useParams();
  const navigate = useNavigate();
  const talentData = mockDocuments[talentId];

  if (!talentData) {
    return (
      <TalentDocumentsWrapper>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <Empty description="Talent not found" />
          <Button type="primary" onClick={() => navigate(-1)} style={{ marginTop: 16 }}>
            Go Back
          </Button>
        </div>
      </TalentDocumentsWrapper>
    );
  }

  return (
    <TalentDocumentsWrapper>
      <div className="header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(`/home/talent-profiles/details/${talentId}`)}
          className="back-button"
        >
          Back to Profile
        </Button>
      </div>

      <h2>Talent Documents</h2>

      <div className="talent-info">
        <div className="info-left">
          <h3>{talentData.name}</h3>
          <p>{talentData.role}</p>
        </div>
        <Tag color="blue">Talent ID: {talentId}</Tag>
      </div>

      <div className="documents-grid">
        {talentData.documents.map((doc, index) => (
          <Card key={index} className="document-card" bodyStyle={{ padding: 0 }}>
            <div className="card-header">
              <div className="doc-title">
                <FilePdfOutlined />
                <h4>{doc.type}</h4>
              </div>
              {doc.verified ? (
                <Tag icon={<CheckCircleFilled />} color="success">Verified</Tag>
              ) : (
                <Tag icon={<CloseCircleFilled />} color="warning">Pending</Tag>
              )}
            </div>
            <div className="card-body">
              <div className="doc-preview">
                <FilePdfOutlined />
                <p>Click to preview</p>
              </div>
              <div className="doc-info">
                <div className="info-row">
                  <span className="label">File Name</span>
                  <span className="value">{doc.fileName}</span>
                </div>
                <div className="info-row">
                  <span className="label">File Size</span>
                  <span className="value">{doc.fileSize}</span>
                </div>
                <div className="info-row">
                  <span className="label">Uploaded On</span>
                  <span className="value">{doc.uploadedOn}</span>
                </div>
              </div>
              <div className="doc-actions">
                <Button icon={<EyeOutlined />}>View</Button>
                <Button icon={<DownloadOutlined />} type="primary" style={{ background: "#00d9a9", borderColor: "#00d9a9" }}>
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TalentDocumentsWrapper>
  );
};

export default TalentDocuments;
