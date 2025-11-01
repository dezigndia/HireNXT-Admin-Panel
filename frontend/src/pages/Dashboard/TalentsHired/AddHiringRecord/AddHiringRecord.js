import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { AddHiringRecordWrapper } from "./AddHiringRecord.style";
import TalentSelection from "./TalentSelection";
import ContractDetails from "./ContractDetails";

const { Step } = Steps;

const AddHiringRecord = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    partnerOrganization: "",
    talentProfile: "",
    talentEmail: "",
    talentBudget: "",
    talentLocation: "",
    customerName: "",
    jobId: "",
    jobTitle: "",
    engagementType: "",
    location: "",
    onboardingDate: null,
    contractDuration: "",
    lastWorkingDay: null,
    costPerMonth: "",
  });

  const steps = [
    {
      title: "Talent Selection",
      component: TalentSelection,
    },
    {
      title: "Contract Details",
      component: ContractDetails,
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

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Final Hiring Record Data:", finalData);
    navigate("/home/talents-hired");
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <AddHiringRecordWrapper>
      <div className="page-header">
        <h1>Add Hiring Record</h1>
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
    </AddHiringRecordWrapper>
  );
};

export default AddHiringRecord;
