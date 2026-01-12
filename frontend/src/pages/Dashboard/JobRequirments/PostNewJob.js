import React, { useState } from "react";
import { Button, message, Steps, Modal } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import JobFormStepOne from "./PostNewJob/JobFormStepOne";
import BasicDetails from "./PostNewJob/BasicDetails";
import WorkPreferenceForm from "./PostNewJob/WorkPreferenceForm";
import { PostNewJobWrapper } from "./PostNewJob.style";
import { API_CONST } from "../../../const";
import { useNavigate } from "react-router-dom";

const PostNewJob = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState("");
  const [isValidBasicDetails, setIsValidBasicDetails] = useState(false);
  const [isValidWorkPreference, setIsValidWorkPreference] = useState(false);
  const [isValidJobDescription, setIsValidJobDescription] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    experienceRange: "",
    primarySkills: [null, null, null],
    secondarySkills: [],
    budget: null,
    budgetPeriod: "Per/month",
    location: "",
    worldwide: false,
    engagementMonths: null,
    engagementType: null,
    requirementCount: null,
    requirementPeriod: "Per/month",
    startDate: null,
    communication: null,
    timezone: null,
    workingHours: null,
    travel: null,
    device: null,
    tools: [],
    shiftTiming: null,
    shiftStart: null,
    shiftEnd: null,
    responsibilities: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    Modal.confirm({
      title: "Cancel Job Posting",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <p>Are you sure you want to cancel?</p>
          <p style={{ color: "#666", fontSize: 13 }}>
            All unsaved changes will be lost.
          </p>
        </div>
      ),
      okText: "Yes, Cancel",
      okButtonProps: { danger: true },
      cancelText: "Continue Editing",
      onOk: () => {
        navigate("/home/job-requirments");
      },
    });
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  const steps = [
    {
      title: "Skill Required",
      content: (
        <div className="step-body">
          <JobFormStepOne formData={formData} onChange={handleChange} setIsValid={setIsValidJobDescription}/>
        </div>
      ),
    },
    {
      title: "Basic Details",
      content: (
        <div className="step-body">
          <BasicDetails
            formData={formData}
            onChange={handleChange}
            setIsValid={setIsValidBasicDetails}
          />
        </div>
      ),
    },
    {
      title: "Preferences",
      content: (
        <div className="step-body">
          <WorkPreferenceForm formData={formData} onChange={handleChange} setIsValid={setIsValidWorkPreference}/>
        </div>
      ),
    },
    {
      title: "Job Responsibilities",
      content: (
        <div className="step-body">
          <div className="rich-editor-container">
            <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Job Responsibilities *</label>
            <ReactQuill
              theme="snow"
              value={value}
              modules={modules}
              formats={formats}
              onChange={(content) => {
                setValue(content);
                handleChange("responsibilities", content);
              }}
              placeholder="Insert text here"
              style={{ minHeight: 200 }}
            />
          </div>
        </div>
      ),
    },
  ];

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_CONST.ADD_JOB_REQUIREMENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        message.success("Job posted successfully!");
        navigate("/home/job-requirments");
      } else {
        console.error("Error submitting form:", response.statusText);
        message.error("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      message.error("Network error. Please try again.");
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <PostNewJobWrapper>
      <div className="post-job-header">
        <h2>Add New Job</h2>
      </div>
      
      <Steps
        current={current}
        items={items}
        style={{ marginBottom: 24, marginTop: 24 }}
      />
      
      <div>{steps[current].content}</div>
      
      <div className="form-actions" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {current > 0 && (
            <Button onClick={prev}>
              Back
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Save & Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit}>
              Post Job
            </Button>
          )}
        </div>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </PostNewJobWrapper>
  );
};

export default PostNewJob;
