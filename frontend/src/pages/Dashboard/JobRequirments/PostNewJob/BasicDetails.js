import React, { useEffect } from "react";
import { Row, Col, Input, InputNumber, Select, DatePicker, Checkbox } from "antd";

const BasicDetails = ({ formData, onChange, setIsValid }) => {
  const validateFields = () => {
    const requiredFields = [
      "budget",
      "location",
      "engagementMonths",
      "engagementType",
      "requirementCount",
      "startDate",
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

  const locationOptions = [
    "Chennai, Tamilnadu",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Kolkata, West Bengal",
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Delhi NCR",
    "Remote",
  ];

  const engagementMonths = [
    "1 Month",
    "2 Months",
    "3 Months",
    "6 Months",
    "9 Months",
    "12 Months",
    "18 Months",
    "24 Months",
  ];

  const engagementTypes = [
    "Full-Time Contract",
    "Part-Time Contract",
    "Freelance",
    "Full-Time Permanent",
  ];

  const communicationLevels = [
    "Excellent",
    "Good",
    "Average",
    "Basic",
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <label>Budget *</label>
          <InputNumber
            placeholder="Enter your price"
            value={formData.budget}
            onChange={(value) => onChange("budget", value)}
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => (value ? value.replace(/,/g, "") : "")}
          />
          <span style={{ fontSize: 12, color: "#666" }}>₹ (this Price will be shown to Developers)</span>
        </Col>

        <Col span={6}>
          <label>Budget Period</label>
          <Select
            placeholder="Per/month"
            value={formData.budgetPeriod || "Per/month"}
            onChange={(value) => onChange("budgetPeriod", value)}
            style={{ width: "100%" }}
            options={[
              { value: "Per/month", label: "Per/month" },
              { value: "Per/hour", label: "Per/hour" },
              { value: "Fixed Price", label: "Fixed Price" },
            ]}
          />
        </Col>

        <Col span={6}>
          <label>Reporting Location *</label>
          <Select
            placeholder="e.g. Chennai, Tamilnadu"
            value={formData.location}
            onChange={(value) => onChange("location", value)}
            style={{ width: "100%" }}
            showSearch
            options={locationOptions.map((loc) => ({ label: loc, value: loc }))}
          />
        </Col>

        <Col span={6}>
          <label>&nbsp;</label>
          <div style={{ marginTop: 8 }}>
            <Checkbox
              checked={formData.worldwide}
              onChange={(e) => onChange("worldwide", e.target.checked)}
            >
              Worldwide
            </Checkbox>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={6}>
          <label>Month of Engagement *</label>
          <Select
            placeholder="3 Months"
            value={formData.engagementMonths}
            onChange={(value) => onChange("engagementMonths", value)}
            style={{ width: "100%" }}
            options={engagementMonths.map((m) => ({ label: m, value: m }))}
          />
        </Col>

        <Col span={6}>
          <label>Engagement Type *</label>
          <Select
            placeholder="Full-Time Contract"
            value={formData.engagementType}
            onChange={(value) => onChange("engagementType", value)}
            style={{ width: "100%" }}
            options={engagementTypes.map((t) => ({ label: t, value: t }))}
          />
        </Col>

        <Col span={6}>
          <label>No of Requirements *</label>
          <InputNumber
            placeholder="Enter number"
            min={1}
            value={formData.requirementCount}
            onChange={(value) => onChange("requirementCount", value)}
            style={{ width: "100%" }}
          />
        </Col>

        <Col span={6}>
          <label>Requirements Period</label>
          <Select
            placeholder="Per/month"
            value={formData.requirementPeriod || "Per/month"}
            onChange={(value) => onChange("requirementPeriod", value)}
            style={{ width: "100%" }}
            options={[
              { value: "Per/month", label: "Per/month" },
              { value: "Total", label: "Total" },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <label>Tentative Start Date *</label>
          <DatePicker
            placeholder="Select start date"
            value={formData.startDate}
            onChange={(date) => onChange("startDate", date)}
            style={{ width: "100%" }}
          />
        </Col>

        <Col span={12}>
          <label>Communication (EN) *</label>
          <Select
            placeholder="Excellent"
            value={formData.communication}
            onChange={(value) => onChange("communication", value)}
            style={{ width: "100%" }}
            options={communicationLevels.map((level) => ({ label: level, value: level }))}
          />
        </Col>
      </Row>
    </>
  );
};

export default BasicDetails;
