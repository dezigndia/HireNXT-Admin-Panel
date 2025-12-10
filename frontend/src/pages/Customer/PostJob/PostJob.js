import React, { useState, useEffect } from "react";
import { Steps, message, Button, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PostJobWrapper } from "./PostJob.style";
import SkillRequired from "./SkillRequired";
import BasicDetails from "./BasicDetails";
import Preferences from "./Preferences";
import JobResponsibilities from "./JobResponsibilities";

const { Step } = Steps;

const mockJobData = {
  "2930493": {
    role: "SAP Hana Developer",
    experienceRange: "5-6 Years",
    primarySkills: [
      { skill: "SAP HANA", level: "Expert" },
      { skill: "SQL", level: "Advanced" },
      { skill: "Data Modeling", level: "Expert" },
    ],
    secondarySkills: [
      { skill: "Python", level: "Intermediate" },
    ],
    budget: "150000",
    budgetPeriod: "Per/month",
    reportingLocation: "Remote",
    worldwide: true,
    monthsOfEngagement: "6",
    engagementType: "Full Time Contract",
    numberOfRequirements: "2",
    tentativeStartDate: "2024-03-01",
    expectations: "Strong problem solving skills",
    communication: "Excellent",
    workingTime: "Full Time",
    workingHoursPerWeek: "40",
    travelPreference: "No Travel",
    provideSystem: "Yes",
    toolsUsed: "SAP HANA Studio, Eclipse, SQL Developer",
    jobResponsibilities: "Design and develop SAP HANA data models. Optimize performance of existing data structures. Collaborate with business teams to understand requirements.",
  },
  "2930494": {
    role: "React Frontend Developer",
    experienceRange: "3-5 Years",
    primarySkills: [
      { skill: "React", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Expert" },
    ],
    secondarySkills: [
      { skill: "Node.js", level: "Intermediate" },
    ],
    budget: "90000",
    budgetPeriod: "Per/month",
    reportingLocation: "Bangalore",
    worldwide: false,
    monthsOfEngagement: "12",
    engagementType: "Full Time Contract",
    numberOfRequirements: "1",
    tentativeStartDate: "2024-02-15",
    expectations: "Experience with large-scale applications",
    communication: "Good",
    workingTime: "Full Time",
    workingHoursPerWeek: "40",
    travelPreference: "Occasional Travel",
    provideSystem: "Yes",
    toolsUsed: "VS Code, Git, Jira",
    jobResponsibilities: "Build and maintain React applications. Implement new features based on requirements. Code review and mentoring junior developers.",
  },
  "2930495": {
    role: "DevOps Engineer",
    experienceRange: "4-7 Years",
    primarySkills: [
      { skill: "Docker", level: "Expert" },
      { skill: "Kubernetes", level: "Advanced" },
      { skill: "AWS", level: "Expert" },
    ],
    secondarySkills: [
      { skill: "Terraform", level: "Advanced" },
    ],
    budget: "120000",
    budgetPeriod: "Per/month",
    reportingLocation: "Remote",
    worldwide: true,
    monthsOfEngagement: "6",
    engagementType: "Contract",
    numberOfRequirements: "1",
    tentativeStartDate: "2024-02-01",
    expectations: "Strong CI/CD experience",
    communication: "Excellent",
    workingTime: "Full Time",
    workingHoursPerWeek: "40",
    travelPreference: "No Travel",
    provideSystem: "No",
    toolsUsed: "Docker, Kubernetes, AWS, Jenkins, Terraform",
    jobResponsibilities: "Design and maintain CI/CD pipelines. Manage cloud infrastructure on AWS. Monitor and optimize system performance.",
  },
  "2930496": {
    role: "Python Backend Developer",
    experienceRange: "2-4 Years",
    primarySkills: [
      { skill: "Python", level: "Expert" },
      { skill: "Django", level: "Advanced" },
      { skill: "PostgreSQL", level: "Advanced" },
    ],
    secondarySkills: [
      { skill: "Redis", level: "Intermediate" },
    ],
    budget: "75000",
    budgetPeriod: "Per/month",
    reportingLocation: "Hyderabad",
    worldwide: false,
    monthsOfEngagement: "12",
    engagementType: "Full Time",
    numberOfRequirements: "2",
    tentativeStartDate: "2024-03-01",
    expectations: "Experience with REST APIs",
    communication: "Good",
    workingTime: "Full Time",
    workingHoursPerWeek: "40",
    travelPreference: "No Travel",
    provideSystem: "Yes",
    toolsUsed: "PyCharm, Git, PostgreSQL, Redis",
    jobResponsibilities: "Develop and maintain backend APIs. Design database schemas. Write unit and integration tests.",
  },
};

const PostJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const isEditMode = Boolean(jobId);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: "",
    experienceRange: "",
    primarySkills: [],
    secondarySkills: [],
    budget: "",
    budgetPeriod: "Per/month",
    reportingLocation: "",
    worldwide: false,
    monthsOfEngagement: "",
    engagementType: "",
    numberOfRequirements: "",
    tentativeStartDate: "",
    expectations: "",
    communication: "",
    workingTime: "",
    workingHoursPerWeek: "",
    travelPreference: "",
    provideSystem: "",
    toolsUsed: "",
    jobResponsibilities: "",
  });

  useEffect(() => {
    if (isEditMode && mockJobData[jobId]) {
      setFormData(mockJobData[jobId]);
    }
  }, [isEditMode, jobId]);

  const steps = [
    {
      title: "Skill Required",
      component: SkillRequired,
    },
    {
      title: "Basic Details",
      component: BasicDetails,
    },
    {
      title: "Preferences",
      component: Preferences,
    },
    {
      title: "Job Responsibilities",
      component: JobResponsibilities,
    },
  ];

  const handleNext = (stepData) => {
    setFormData({ ...formData, ...stepData });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (stepData) => {
    const finalData = { ...formData, ...stepData };
    console.log(isEditMode ? "Updating job:" : "Submitting job:", finalData);
    
    message.success(isEditMode ? "Job updated successfully!" : "Job posted successfully!");
    navigate("/customer/my-jobs");
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
      okButtonProps: { 
        danger: true,
      },
      cancelText: "Continue Editing",
      onOk: () => {
        navigate("/customer/my-jobs");
      },
    });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <PostJobWrapper>
      <div className="post-job-header">
        <div className="header-content">
          <h2>{isEditMode ? "Edit Job" : "Post Job"}</h2>
          {isEditMode && (
            <span style={{ color: "#666", fontSize: 14, marginLeft: 12 }}>
              Job ID: {jobId}
            </span>
          )}
        </div>
        <Button 
          className="cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>

      <div className="steps-container">
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>

      <div className="form-card">
        <CurrentStepComponent
          initialData={formData}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
          isEditMode={isEditMode}
        />
      </div>
    </PostJobWrapper>
  );
};

export default PostJob;
