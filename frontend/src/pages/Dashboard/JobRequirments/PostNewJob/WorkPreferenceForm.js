import React from "react";
import { Row, Col, TimePicker, InputNumber, Select, Radio, Input } from "antd";

const WorkPreferenceForm = ({ formData, onChange }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <label>Availability</label>
          <TimePicker.RangePicker
            style={{ width: "100%" }}
            onChange={(value) => onChange("availability", value)}
            value={formData.availability}
          />
        </Col>
        <Col span={6}>
          <label>Working Hours/Week</label>
          <InputNumber
            placeholder="Hours"
            min={1}
            max={168}
            value={formData.workingHours}
            onChange={(value) => onChange("workingHours", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={6}>
          <label>Travel Preference</label>
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
          <label>System Preference</label>
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
          <label>Tools Used to Manage</label>
          <Input
            placeholder="e.g., Jira, Trello"
            value={formData.tools}
            onChange={(e) => onChange("tools", e.target.value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default WorkPreferenceForm;
