import React, { useState } from "react";
import { Form, Select, Button, InputNumber, Row, Col, TimePicker } from "antd";

const { Option } = Select;

const Preferences = ({ initialData, onNext, onBack }) => {
  const [form] = Form.useForm();
  const [shiftTiming, setShiftTiming] = useState(initialData?.shiftTiming || null);

  const handleSubmit = (values) => {
    onNext(values);
  };

  const workingTimeZones = [
    "IST (Indian Standard Time)",
    "EST (Eastern Standard Time)",
    "PST (Pacific Standard Time)",
    "GMT (Greenwich Mean Time)",
    "CST (Central Standard Time)",
    "JST (Japan Standard Time)",
    "AEST (Australian Eastern Standard Time)",
  ];

  const travelPreferences = [
    "Remote",
    "Hybrid",
    "On-site",
    "Willing to Travel",
    "Not Specified",
  ];

  const systemProvision = [
    "Yes - Laptop",
    "Yes - Desktop",
    "Yes - Both",
    "Not Specified",
    "No",
  ];

  const toolsOptions = [
    "Agile Practice",
    "Scrum",
    "Kanban",
    "Waterfall",
    "Jira",
    "Trello",
    "Asana",
    "Monday.com",
    "Slack",
    "Microsoft Teams",
    "Not Specified",
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialData}
    >
      <div className="four-column-grid">
        <Form.Item
          name="workingTime"
          label="Timezone"
          rules={[{ required: true, message: "Please select timezone" }]}
        >
          <Select placeholder="Select Timezone" showSearch>
            {workingTimeZones.map((zone) => (
              <Option key={zone} value={zone}>
                {zone}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="workingHoursPerWeek"
          label="No of Working hours/week"
          rules={[{ required: true, message: "Please enter hours" }]}
        >
          <InputNumber
            placeholder="40"
            style={{ width: "100%" }}
            min={1}
            max={168}
          />
        </Form.Item>

        <Form.Item
          name="travelPreference"
          label="Travel Preference"
          rules={[{ required: true, message: "Please select preference" }]}
        >
          <Select placeholder="Remote">
            {travelPreferences.map((pref) => (
              <Option key={pref} value={pref}>
                {pref}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="provideSystem"
          label="Do you provide System"
          rules={[{ required: true, message: "Please select option" }]}
        >
          <Select placeholder="Not Specified">
            {systemProvision.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="two-column-grid">
        <Form.Item
          name="toolsUsed"
          label="Tools Used to Manage"
          rules={[{ required: true, message: "Please select tools" }]}
        >
          <Select 
            placeholder="Select tools" 
            mode="multiple"
            showSearch
          >
            {toolsOptions.map((tool) => (
              <Option key={tool} value={tool}>
                {tool}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="four-column-grid">
        <Form.Item
          name="shiftTiming"
          label="Shift Timing"
          rules={[{ required: true, message: "Please select shift timing" }]}
        >
          <Select 
            placeholder="Select Shift Timing" 
            onChange={(value) => setShiftTiming(value)}
          >
            <Option value="Morning">Morning (6 AM to 3 PM)</Option>
            <Option value="General">General (9 AM to 6 PM)</Option>
            <Option value="Custom">Custom</Option>
          </Select>
        </Form.Item>

        {shiftTiming === "Custom" && (
          <>
            <Form.Item
              name="shiftStart"
              label="Shift Start"
              rules={[{ required: true, message: "Please select start time" }]}
            >
              <TimePicker 
                format="h:mm A" 
                use12Hours 
                style={{ width: "100%" }}
                placeholder="Select start time"
              />
            </Form.Item>

            <Form.Item
              name="shiftEnd"
              label="Shift End"
              rules={[{ required: true, message: "Please select end time" }]}
            >
              <TimePicker 
                format="h:mm A" 
                use12Hours 
                style={{ width: "100%" }}
                placeholder="Select end time"
              />
            </Form.Item>
          </>
        )}
      </div>

      <div className="form-actions">
        <Button onClick={onBack}>
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Save & Next
        </Button>
      </div>
    </Form>
  );
};

export default Preferences;
