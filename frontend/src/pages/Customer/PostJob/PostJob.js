import React, { useState } from "react";
import { Steps, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PostJobWrapper } from "./PostJob.style";
import SkillRequired from "./SkillRequired";
import BasicDetails from "./BasicDetails";
import Preferences from "./Preferences";
import JobResponsibilities from "./JobResponsibilities";

const { Step } = Steps;

const PostJob = () => {
  const navigate = useNavigate();
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
    console.log("Submitting job:", finalData);
    
    message.success("Job posted successfully!");
    navigate("/customer/my-jobs");
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <PostJobWrapper>
      <div className="post-job-header">
        <h2>Post Job</h2>
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
        />
      </div>
    </PostJobWrapper>
  );
};

export default PostJob;
