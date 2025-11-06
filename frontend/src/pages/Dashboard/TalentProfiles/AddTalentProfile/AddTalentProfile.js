import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { AddTalentProfileWrapper } from "./AddTalentProfile.style";
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";

const { Step } = Steps;

const AddTalentProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    partnerOrganization: "",
    name: "",
    role: "",
    skills: [],
    experienceYears: "",
    experienceMonths: "",
    rate: "",
    notice: "",
    email: "",
    phone: "",
    location: "",
    availability: "",
    summary: "",
    projects: [],
    aadhar: null,
    pan: null,
    degree: null,
  });

  const steps = [
    {
      title: "Basic Information",
      component: BasicInformation,
    },
    {
      title: "Additional Information",
      component: AdditionalInformation,
    },
  ];

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = (data = {}) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    console.log("Final Talent Profile Data:", finalData);
    
    // TODO: Make API call to submit the talent profile
    // You can access finalData.resume, finalData.aadhar, etc. for file uploads
    
    navigate("/home/talent-profiles");
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <AddTalentProfileWrapper>
      <div className="page-header">
        <h1>Add New Talent Profile</h1>
      </div>

      <div className="form-container">
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
      </div>
    </AddTalentProfileWrapper>
  );
};

export default AddTalentProfile;
