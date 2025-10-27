import React, { useState } from "react";
import { Form, Button } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const JobResponsibilities = ({ initialData, onBack, onSubmit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [responsibilities, setResponsibilities] = useState(
    initialData.jobResponsibilities || ""
  );

  const handleSubmit = () => {
    if (!responsibilities || responsibilities === "<p><br></p>") {
      form.setFields([
        {
          name: "jobResponsibilities",
          errors: ["Please enter job responsibilities"],
        },
      ]);
      return;
    }

    onSubmit({ jobResponsibilities: responsibilities });
  };

  const handleCancel = () => {
    navigate("/customer/my-jobs");
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

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="jobResponsibilities"
        label="Job Responsibilities"
        required
        rules={[
          { required: true, message: "Please enter job responsibilities" },
        ]}
      >
        <div className="rich-editor-container">
          <ReactQuill
            theme="snow"
            value={responsibilities}
            onChange={setResponsibilities}
            modules={modules}
            formats={formats}
            placeholder="Insert text here"
          />
        </div>
      </Form.Item>

      <div className="form-actions">
        <Button size="large" onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="large" onClick={onBack}>
          Back
        </Button>
        <Button type="primary" htmlType="button" size="large" onClick={handleSubmit}>
          Post Job
        </Button>
      </div>
    </Form>
  );
};

export default JobResponsibilities;
