import React from "react";
import { Form, Input, Select, Button, InputNumber, Checkbox, Row, Col } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const BasicDetails = ({ initialData, onNext, onBack }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onNext(values);
  };

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
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ ...initialData, budgetPeriod: "Per/month", numberOfRequirementsPeriod: "Per/month" }}
    >
      <div className="four-column-grid">
        <Form.Item
          name="budget"
          label="Budget"
          rules={[{ required: true, message: "Please enter budget" }]}
          extra="₹ (this Price will be shown to Developers)"
        >
          <InputNumber
            placeholder="Enter your price"
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => (value ? value.replace(/,/g, "") : "")}
          />
        </Form.Item>

        <Form.Item name="budgetPeriod" label=" " initialValue="Per/month">
          <Select>
            <Option value="Per/month">Per/month</Option>
            <Option value="Per/hour">Per/hour</Option>
            <Option value="Fixed Price">Fixed Price</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="reportingLocation"
          label="Reporting Location"
          rules={[{ required: true, message: "Please select location" }]}
        >
          <Select placeholder="e.g. Chennai, Tamilnadu, Kolkata" showSearch>
            {locationOptions.map((location) => (
              <Option key={location} value={location}>
                {location}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="worldwide" valuePropName="checked" label=" ">
          <Checkbox style={{ marginTop: '8px' }}>Worldwide</Checkbox>
        </Form.Item>
      </div>

      <div className="four-column-grid">
        <Form.Item
          name="monthsOfEngagement"
          label="Month of Engagement"
          rules={[
            { required: true, message: "Please select engagement period" },
          ]}
        >
          <Select placeholder="3 Months">
            {engagementMonths.map((month) => (
              <Option key={month} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="engagementType"
          label="Engagement Type"
          rules={[{ required: true, message: "Please select type" }]}
        >
          <Select placeholder="Full-Time Contract">
            {engagementTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="numberOfRequirements"
          label="No of Requirements"
          rules={[{ required: true, message: "Please enter number" }]}
        >
          <InputNumber
            placeholder="Enter your price"
            style={{ width: "100%" }}
            min={1}
          />
        </Form.Item>

        <Form.Item name="numberOfRequirementsPeriod" label=" " initialValue="Per/month">
          <Select>
            <Option value="Per/month">Per/month</Option>
            <Option value="Total">Total</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="two-column-grid">
        <Form.Item
          name="tentativeStartDate"
          label="Tentative Start Date"
          rules={[{ required: true, message: "Please enter start date" }]}
        >
          <Input
            type="date"
            placeholder="e.g. Chennai, Tamilnadu, Kolkata"
          />
        </Form.Item>
        <Form.Item
          name="communication"
          label="Communication (EN)"
          rules={[
            { required: true, message: "Please select communication level" },
          ]}
        >
          <Select placeholder="Excellent">
            {communicationLevels.map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </Form.Item>
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

export default BasicDetails;
