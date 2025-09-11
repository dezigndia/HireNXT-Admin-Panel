import React, { useEffect } from "react";
import { Row, Col, TimePicker, InputNumber, Select, Radio, Input } from "antd";

const WorkPreferenceForm = ({ formData, onChange, setIsValid }) => {
  useEffect(() => {
    const validateForm = () => {
      const isAvailabilityValid =
        formData.availability && formData.availability.length === 2;
      const isWorkingHoursValid =
        formData.workingHours &&
        formData.workingHours > 0 &&
        formData.workingHours <= 168;
      const isTravelValid = formData.travel && formData.travel.length > 0;
      const isDeviceValid =
        formData.device !== undefined && formData.device !== null;
      const isToolsValid = formData.tools && formData.tools.trim().length > 0;

      setIsValid(
        isAvailabilityValid &&
          isWorkingHoursValid &&
          isTravelValid &&
          isDeviceValid &&
          isToolsValid
      );
    };

    validateForm();
  }, [formData, setIsValid]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <label>Availability *</label>
          <TimePicker.RangePicker
            style={{ width: "100%" }}
            onChange={(value) => onChange("availability", value)}
            value={formData.availability}
            required
          />
        </Col>
        <Col span={6}>
          <label>Working Hours/Week *</label>
          <InputNumber
            placeholder="Hours"
            min={1}
            max={168}
            value={formData.workingHours}
            onChange={(value) => onChange("workingHours", value)}
            style={{ width: "100%" }}
            required
          />
        </Col>
        <Col span={6}>
          <label>Travel Preference *</label>
          <Select
            placeholder="Select"
            value={formData.travel}
            onChange={(value) => onChange("travel", value)}
            style={{ width: "100%" }}
            options={[
              { value: "none", label: "No Travel" },
              { value: "occasional", label: "Occasional" },
              { value: "frequent", label: "Frequent" },
            ]}
          />
        </Col>
        <Col span={6}>
          <label>System Preference *</label>
          <Radio.Group
            style={{ width: "100%" }}
            value={formData.device}
            onChange={(e) => onChange("device", e.target.value)}
          >
            <Radio value={true}>System Provided</Radio>
            <Radio value={false}>BYOD</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <label>Tools Used to Manage *</label>
          <Input
            placeholder="e.g., Jira, Trello"
            value={formData.tools}
            onChange={(e) => onChange("tools", e.target.value)}
            style={{ width: "100%" }}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default WorkPreferenceForm;
