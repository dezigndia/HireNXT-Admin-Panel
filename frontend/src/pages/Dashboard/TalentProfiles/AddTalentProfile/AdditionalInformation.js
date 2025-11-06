import React, { useState } from "react";
import { Form, Button, Upload, Row, Col, Input, Card } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { FormStepWrapper } from "./AddTalentProfile.style";

const AdditionalInformation = ({ initialData, onBack, onSubmit, isLastStep }) => {
  const [form] = Form.useForm();
  const [aadhar, setAadhar] = useState(initialData.aadhar || null);
  const [pan, setPan] = useState(initialData.pan || null);
  const [degree, setDegree] = useState(initialData.degree || null);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const finalData = {
          ...values,
          aadhar,
          pan,
          degree,
        };
        onSubmit(finalData);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleBack = () => {
    const formValues = form.getFieldsValue();
    const documentData = {
      ...formValues,
      aadhar,
      pan,
      degree,
    };
    onBack(documentData);
  };

  return (
    <FormStepWrapper>
      <h2 className="form-title">Additional Information</h2>
      
      <Form 
        form={form} 
        layout="vertical"
        initialValues={initialData}
      >
        <Form.Item label="Professional Summary (Optional)" name="summary">
          <Input.TextArea 
            rows={4} 
            placeholder="Enter professional summary highlighting key skills, experience, and expertise..." 
          />
        </Form.Item>
        
        <Form.Item label="Project Experience (Optional)">
          <Form.List name="projects">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    style={{ marginBottom: 16, background: '#fafafa' }}
                    extra={
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ color: '#ff4d4f', fontSize: '16px' }}
                      />
                    }
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          label="Project Title"
                          rules={[{ required: true, message: 'Please enter project title' }]}
                        >
                          <Input placeholder="e.g., E-commerce Platform Development" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'client']}
                          label="Client"
                        >
                          <Input placeholder="e.g., Fortune 500 Company" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'duration']}
                          label="Duration"
                        >
                          <Input placeholder="e.g., 6 months" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'role']}
                          label="Your Role"
                        >
                          <Input placeholder="e.g., Lead Developer" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'technologies']}
                          label="Technologies"
                        >
                          <Input placeholder="e.g., React, Node.js, MongoDB" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Description"
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Describe the project, your contributions, and achievements..."
                      />
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Project
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

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
            <strong>Note:</strong> Professional Summary, Project Experience, and Document uploads are optional but recommended for better profile completeness.
          </p>
        </div>

        <div className="button-group">
          <Button onClick={handleBack}>
            Back
          </Button>
          <Button 
            type="primary" 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </FormStepWrapper>
  );
};

export default AdditionalInformation;
