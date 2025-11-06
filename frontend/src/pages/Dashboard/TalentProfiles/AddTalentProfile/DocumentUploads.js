import React, { useState } from "react";
import { Form, Button, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormStepWrapper } from "./AddTalentProfile.style";

const DocumentUploads = ({ initialData, onBack, onSubmit, isLastStep }) => {
  const [form] = Form.useForm();
  const [resume, setResume] = useState(initialData.resume || null);
  const [aadhar, setAadhar] = useState(initialData.aadhar || null);
  const [pan, setPan] = useState(initialData.pan || null);
  const [degree, setDegree] = useState(initialData.degree || null);

  const handleSubmit = () => {
    const documentData = {
      resume,
      aadhar,
      pan,
      degree,
    };
    onSubmit(documentData);
  };

  const handleBack = () => {
    const documentData = {
      resume,
      aadhar,
      pan,
      degree,
    };
    onBack(documentData);
  };

  return (
    <FormStepWrapper>
      <h2 className="form-title">Document Uploads</h2>
      
      <Form form={form} layout="vertical">
        <div className="upload-section">
          <label className="upload-label">Upload Resume *</label>
          <Upload
            beforeUpload={(file) => {
              setResume(file);
              return false;
            }}
            showUploadList={false}
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />}>
              {resume ? "Change Resume" : "Click to Upload Resume"}
            </Button>
          </Upload>
          {resume && (
            <div className="file-info">
              <span className="file-name">{resume.name}</span>
              <span className="remove-btn" onClick={() => setResume(null)}>
                Remove
              </span>
            </div>
          )}
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <div className="upload-section">
              <label className="upload-label">Upload Aadhar Card</label>
              <Upload
                beforeUpload={(file) => {
                  setAadhar(file);
                  return false;
                }}
                showUploadList={false}
                accept=".pdf,.jpg,.jpeg,.png"
              >
                <Button icon={<UploadOutlined />}>
                  {aadhar ? "Change Aadhar" : "Upload Aadhar"}
                </Button>
              </Upload>
              {aadhar && (
                <div className="file-info">
                  <span className="file-name">{aadhar.name}</span>
                  <span className="remove-btn" onClick={() => setAadhar(null)}>
                    Remove
                  </span>
                </div>
              )}
            </div>
          </Col>

          <Col span={8}>
            <div className="upload-section">
              <label className="upload-label">Upload PAN Card</label>
              <Upload
                beforeUpload={(file) => {
                  setPan(file);
                  return false;
                }}
                showUploadList={false}
                accept=".pdf,.jpg,.jpeg,.png"
              >
                <Button icon={<UploadOutlined />}>
                  {pan ? "Change PAN" : "Upload PAN"}
                </Button>
              </Upload>
              {pan && (
                <div className="file-info">
                  <span className="file-name">{pan.name}</span>
                  <span className="remove-btn" onClick={() => setPan(null)}>
                    Remove
                  </span>
                </div>
              )}
            </div>
          </Col>

          <Col span={8}>
            <div className="upload-section">
              <label className="upload-label">Upload Degree Proof</label>
              <Upload
                beforeUpload={(file) => {
                  setDegree(file);
                  return false;
                }}
                showUploadList={false}
                accept=".pdf,.jpg,.jpeg,.png"
              >
                <Button icon={<UploadOutlined />}>
                  {degree ? "Change Degree" : "Upload Degree"}
                </Button>
              </Upload>
              {degree && (
                <div className="file-info">
                  <span className="file-name">{degree.name}</span>
                  <span className="remove-btn" onClick={() => setDegree(null)}>
                    Remove
                  </span>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: 16, padding: 16, background: "#f8f9fd", borderRadius: 4 }}>
          <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
            <strong>Note:</strong> Resume upload is mandatory. Other documents (Aadhar, PAN, Degree) are optional but recommended for background verification.
          </p>
        </div>

        <div className="button-group">
          <Button onClick={handleBack}>
            Back
          </Button>
          <Button 
            type="primary" 
            onClick={handleSubmit}
            disabled={!resume}
          >
            Submit
          </Button>
        </div>
      </Form>
    </FormStepWrapper>
  );
};

export default DocumentUploads;
