// @ts-nocheck
import React, { useEffect } from "react";
import { Row, Col, Input, InputNumber, Select, DatePicker } from "antd";

const { TextArea } = Input;

const BasicDetails = ({ formData, onChange, setIsValid }) => {
  const validateFields = () => {
    const requiredFields = [
      "budget",
      "location",
      "engagementMonths",
      "engagementType",
      "requirementCount",
      "startDate",
      "expectations",
      "communication",
    ];

    const isValid = requiredFields.every((field) => {
      if (field === "startDate") {
        return formData[field] && formData[field].isValid();
      }
      return (
        formData[field] !== undefined &&
        formData[field] !== null &&
        formData[field] !== ""
      );
    });

    setIsValid(isValid);
  };

  useEffect(() => {
    validateFields();
  }, [formData]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <label>Budget *</label>
        <InputNumber
          placeholder="Budget"
          value={formData.budget}
          onChange={(value) => onChange("budget", value)}
          style={{ width: "100%" }}
          required
        />
      </Col>

      <Col span={6}>
        <label>Reporting Location *</label>
        <Input
          placeholder="Reporting Location"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          style={{ width: "100%" }}
          required
        />
      </Col>

      <Col span={6}>
        <label>Month of Engagement *</label>
        <InputNumber
          placeholder="Month of Engagement"
          min={1}
          max={60}
          value={formData.engagementMonths}
          onChange={(value) => onChange("engagementMonths", value)}
          style={{ width: "100%" }}
          required
        />
      </Col>

      <Col span={6}>
        <label>Engagement Type *</label>
        <Select
          placeholder="Engagement Type"
          value={formData.engagementType}
          onChange={(value) => onChange("engagementType", value)}
          style={{ width: "100%" }}
          required
          options={[
            { value: "fulltime", label: "Full Time" },
            { value: "contract", label: "Contract" },
          ]}
        />
      </Col>

      <Col span={6}>
        <label>No of Requirements *</label>
        <InputNumber
          placeholder="No of Requirements"
          min={1}
          value={formData.requirementCount}
          onChange={(value) => onChange("requirementCount", value)}
          style={{ width: "100%" }}
          required
        />
      </Col>

      <Col span={6}>
        <label>Tentative Start Date *</label>
        <DatePicker
          placeholder="Start Date"
          value={formData.startDate}
          onChange={(date) => onChange("startDate", date)}
          style={{ width: "100%" }}
          required
        />
      </Col>

      <Col span={6}>
        <label>Expectations *</label>
        <TextArea
          placeholder="Expectations"
          value={formData.expectations}
          onChange={(e) => onChange("expectations", e.target.value)}
          autoSize
          required
        />
      </Col>

      <Col span={6}>
        <label>Communication (EN) *</label>
        <Select
          placeholder="Communication"
          value={formData.communication}
          onChange={(value) => onChange("communication", value)}
          style={{ width: "100%" }}
          required
          options={[
            { value: "basic", label: "Basic" },
            { value: "intermediate", label: "Intermediate" },
            { value: "expert", label: "Expert" },
          ]}
        />
      </Col>
    </Row>
  );
};

export default BasicDetails;
