import React, { useState } from "react";
import { Form, Select, Button, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const ContractDetails = ({ initialData, onBack, onSubmit, isLastStep }) => {
  const [form] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] = useState(initialData.customerName);
  const [selectedJob, setSelectedJob] = useState(initialData.jobId);
  const [contractDuration, setContractDuration] = useState(initialData.contractDuration || "");
  const [onboardingDate, setOnboardingDate] = useState(
    initialData.onboardingDate ? dayjs(initialData.onboardingDate) : null
  );
  const [lastWorkingDay, setLastWorkingDay] = useState(
    initialData.lastWorkingDay ? dayjs(initialData.lastWorkingDay) : null
  );

  const customers = [
    { id: "C001", name: "Acme Corporation" },
    { id: "C002", name: "GlobalTech Industries" },
    { id: "C003", name: "Innovation Labs" },
    { id: "C004", name: "Enterprise Solutions" },
    { id: "C005", name: "Future Systems" },
  ];

  const jobsByCustomer = {
    "C001": [
      { id: "J001", title: "Senior Full Stack Developer", location: "Bangalore, Karnataka" },
      { id: "J002", title: "React Native Developer", location: "Mumbai, Maharashtra" },
    ],
    "C002": [
      { id: "J003", title: "Backend Developer", location: "Pune, Maharashtra" },
      { id: "J004", title: "Cloud Architect", location: "Hyderabad, Telangana" },
    ],
    "C003": [
      { id: "J005", title: "DevOps Engineer", location: "Bangalore, Karnataka" },
      { id: "J006", title: "Frontend Developer", location: "Chennai, Tamil Nadu" },
    ],
    "C004": [
      { id: "J007", title: "Data Engineer", location: "Delhi, NCR" },
      { id: "J008", title: "Mobile App Developer", location: "Pune, Maharashtra" },
    ],
    "C005": [
      { id: "J009", title: "QA Automation Engineer", location: "Bangalore, Karnataka" },
      { id: "J010", title: "UI/UX Developer", location: "Mumbai, Maharashtra" },
    ],
  };

  const engagementTypes = [
    "Full-Time Contract",
    "Part-Time Contract",
    "Contract to Hire",
    "Fixed Term Contract",
  ];

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    setSelectedJob("");
    form.setFieldsValue({
      jobId: undefined,
      location: undefined,
    });
  };

  const handleJobChange = (jobId) => {
    setSelectedJob(jobId);
    const jobs = jobsByCustomer[selectedCustomer] || [];
    const job = jobs.find(j => j.id === jobId);
    
    if (job) {
      form.setFieldsValue({
        location: job.location,
      });
    }
  };

  const calculateLastWorkingDay = (startDate, duration) => {
    if (!startDate || !duration) return null;

    const durationValue = parseInt(duration);
    if (isNaN(durationValue)) return null;

    const start = dayjs(startDate);
    const end = start.add(durationValue, 'month');
    return end;
  };

  const handleOnboardingDateChange = (date) => {
    setOnboardingDate(date);
    if (date && contractDuration) {
      const calculatedEnd = calculateLastWorkingDay(date, contractDuration);
      setLastWorkingDay(calculatedEnd);
      form.setFieldsValue({
        lastWorkingDay: calculatedEnd,
      });
    }
  };

  const handleContractDurationChange = (value) => {
    setContractDuration(value);
    if (onboardingDate && value) {
      const calculatedEnd = calculateLastWorkingDay(onboardingDate, value);
      setLastWorkingDay(calculatedEnd);
      form.setFieldsValue({
        lastWorkingDay: calculatedEnd,
      });
    }
  };

  const handleBack = () => {
    const currentValues = form.getFieldsValue();
    const jobs = jobsByCustomer[selectedCustomer] || [];
    const job = jobs.find(j => j.id === currentValues.jobId);
    
    onBack({
      customerName: currentValues.customerName || "",
      jobId: currentValues.jobId || "",
      jobTitle: job?.title || "",
      engagementType: currentValues.engagementType || "",
      location: currentValues.location || "",
      onboardingDate: currentValues.onboardingDate ? currentValues.onboardingDate.format("YYYY-MM-DD") : null,
      contractDuration: currentValues.contractDuration || "",
      lastWorkingDay: currentValues.lastWorkingDay ? currentValues.lastWorkingDay.format("YYYY-MM-DD") : null,
      costPerMonth: currentValues.costPerMonth || "",
    });
  };

  const handleSubmit = (values) => {
    const jobs = jobsByCustomer[selectedCustomer] || [];
    const job = jobs.find(j => j.id === values.jobId);
    
    onSubmit({
      customerName: values.customerName,
      jobId: values.jobId,
      jobTitle: job?.title || "",
      engagementType: values.engagementType,
      location: values.location,
      onboardingDate: values.onboardingDate ? values.onboardingDate.format("YYYY-MM-DD") : null,
      contractDuration: values.contractDuration,
      lastWorkingDay: values.lastWorkingDay ? values.lastWorkingDay.format("YYYY-MM-DD") : null,
      costPerMonth: values.costPerMonth,
    });
  };

  const availableJobs = selectedCustomer ? jobsByCustomer[selectedCustomer] || [] : [];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...initialData,
        onboardingDate: initialData.onboardingDate ? dayjs(initialData.onboardingDate) : null,
        lastWorkingDay: initialData.lastWorkingDay ? dayjs(initialData.lastWorkingDay) : null,
      }}
    >
      <div className="two-column-grid">
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: "Please select a customer" }]}
        >
          <Select
            placeholder="Select Customer"
            onChange={handleCustomerChange}
            showSearch
            filterOption={(input, option) =>
              (option?.children || "").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {customers.map((customer) => (
              <Option key={customer.id} value={customer.id}>
                {customer.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="jobId"
          label="Job ID - Job Title"
          rules={[{ required: true, message: "Please select a job" }]}
        >
          <Select
            placeholder="Select Job"
            onChange={handleJobChange}
            disabled={!selectedCustomer}
            showSearch
            filterOption={(input, option) =>
              (option?.children || "").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {availableJobs.map((job) => (
              <Option key={job.id} value={job.id}>
                {job.id} - {job.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="two-column-grid">
        <Form.Item
          name="engagementType"
          label="Engagement Type"
          rules={[{ required: true, message: "Please select engagement type" }]}
        >
          <Select placeholder="Select Engagement Type">
            {engagementTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Select placeholder="Location (Auto-populated)" disabled>
            <Option value="">Select location</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="three-column-grid">
        <Form.Item
          name="onboardingDate"
          label="Onboarding Date"
          rules={[{ required: true, message: "Please select onboarding date" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder="Select Date"
            onChange={handleOnboardingDateChange}
          />
        </Form.Item>

        <Form.Item
          name="contractDuration"
          label="Contract Duration (Months)"
          rules={[{ required: true, message: "Please enter contract duration" }]}
        >
          <InputNumber
            placeholder="Enter months"
            style={{ width: "100%" }}
            min={1}
            max={120}
            onChange={handleContractDurationChange}
          />
        </Form.Item>

        <Form.Item
          name="lastWorkingDay"
          label="Last Working Day"
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder="Auto-calculated"
            disabled
          />
        </Form.Item>
      </div>

      <div className="two-column-grid">
        <Form.Item
          name="costPerMonth"
          label="Final Cost Per Month"
          rules={[{ required: true, message: "Please enter cost per month" }]}
        >
          <InputNumber
            placeholder="Enter amount"
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value ? value.replace(/₹\s?|(,*)/g, "") : ""}
          />
        </Form.Item>
      </div>

      <div className="form-actions">
        <Button onClick={handleBack}>
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Submit Hiring Record
        </Button>
      </div>
    </Form>
  );
};

export default ContractDetails;
