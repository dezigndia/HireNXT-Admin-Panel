import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobFormStepOne from "./PostNewJob/JobFormStepOne";
import BasicDetails from "./PostNewJob/BasicDetails";
import WorkPreferenceForm from "./PostNewJob/WorkPreferenceForm";
import { PostNewJobWrapper } from "./PostNewJob.style";

const PostNewJob = () => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(""); // For ReactQuill

  const [formData, setFormData] = useState({
    role: "",
    minExp: null,
    maxExp: null,
    primarySkills: [
      { skill: null, level: null },
      { skill: null, level: null },
    ],
    secondarySkills: [],
    budget: null,
    location: "",
    engagementMonths: null,
    engagementType: null,
    requirementCount: null,
    startDate: null,
    expectations: "",
    communication: null,
    workingHours: null,
    availability: null,
    travel: null,
    tools: "",
    device: null,
    responsibilities: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "Skill Required",
      content: (
        <div className="step-body">
          <JobFormStepOne formData={formData} onChange={handleChange} />
        </div>
      ),
    },
    {
      title: "Basic Details",
      content: (
        <div className="step-body">
          <BasicDetails formData={formData} onChange={handleChange} />
        </div>
      ),
    },
    {
      title: "Preferences",
      content: (
        <div className="step-body">
          <WorkPreferenceForm formData={formData} onChange={handleChange} />
        </div>
      ),
    },
    {
      title: "Job Responsibilities",
      content: (
        <div className="step-body" style={{ height: "300px" }}>
          <ReactQuill
            theme="snow"
            value={value}
            modules={{
              toolbar: toolbarOptions,
            }}
            onChange={(content) => {
              setValue(content);
              handleChange("responsibilities", content);
            }}
            style={{ height: "170px" }}
          />
        </div>
      ),
    },
  ];

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    message.success("Processing complete!");
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <PostNewJobWrapper>
      <Steps
        current={current}
        items={items}
        style={{ marginBottom: 24, marginTop: 24 }}
      />
      <div>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </PostNewJobWrapper>
  );
};
export default PostNewJob;
