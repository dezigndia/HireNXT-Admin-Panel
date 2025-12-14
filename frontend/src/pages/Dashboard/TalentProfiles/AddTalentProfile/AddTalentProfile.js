import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Steps, message } from "antd";
import { AddTalentProfileWrapper } from "./AddTalentProfile.style";
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";

const { Step } = Steps;

const mockTalentData = {
  1: {
    partnerOrganization: "TechCorp Solutions",
    name: "Rajesh Kumar",
    role: "Full Stack Developer",
    skills: [
      { skill: "SAP HANA", level: "Expert" },
      { skill: "SQL", level: "Advanced" },
      { skill: "Data Modeling", level: "Expert" },
    ],
    experienceYears: "5",
    experienceMonths: "0",
    rate: "180000",
    notice: "30 Days",
    email: "rajesh.kumar@gmail.com",
    phone: "+91-9876543210",
    location: "Bangalore",
    availability: "Immediately Available",
    summary: "Highly skilled developer with over 5 years of experience in full-stack development.",
    projects: [],
    resume: null,
    aadhar: null,
    pan: null,
    degree: null,
  },
  2: {
    partnerOrganization: "Digital Partners Inc",
    name: "Priya Sharma",
    role: "React Developer",
    skills: [
      { skill: "React", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Advanced" },
    ],
    experienceYears: "4",
    experienceMonths: "0",
    rate: "150000",
    notice: "15 Days",
    email: "priya.sharma@gmail.com",
    phone: "+91-9876543211",
    location: "Mumbai",
    availability: "Available in 2 weeks",
    summary: "Passionate React Developer with 4 years of experience building modern web applications.",
    projects: [],
    resume: null,
    aadhar: null,
    pan: null,
    degree: null,
  },
  3: {
    partnerOrganization: "Innovate Tech",
    name: "Amit Patel",
    role: "DevOps Engineer",
    skills: [
      { skill: "Docker", level: "Expert" },
      { skill: "Kubernetes", level: "Expert" },
      { skill: "AWS", level: "Advanced" },
    ],
    experienceYears: "6",
    experienceMonths: "0",
    rate: "200000",
    notice: "30 Days",
    email: "amit.patel@gmail.com",
    phone: "+91-9876543212",
    location: "Pune",
    availability: "Immediately Available",
    summary: "Experienced DevOps Engineer with 6 years of expertise in cloud infrastructure.",
    projects: [],
    resume: null,
    aadhar: null,
    pan: null,
    degree: null,
  },
};

for (let i = 4; i <= 10; i++) {
  mockTalentData[i] = {
    partnerOrganization: "TechCorp Solutions",
    name: `Developer ${i}`,
    role: "Software Engineer",
    skills: [
      { skill: "JavaScript", level: "Advanced" },
      { skill: "React", level: "Intermediate" },
    ],
    experienceYears: String(3 + (i % 3)),
    experienceMonths: "6",
    rate: String(100000 + i * 10000),
    notice: "30 Days",
    email: `developer${i}@gmail.com`,
    phone: `+91-987654321${i}`,
    location: "Bangalore",
    availability: "Immediately Available",
    summary: "Experienced developer with strong technical skills.",
    projects: [],
    resume: null,
    aadhar: null,
    pan: null,
    degree: null,
  };
}

const AddTalentProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);
  
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
    resume: null,
    aadhar: null,
    pan: null,
    degree: null,
  });

  useEffect(() => {
    if (isEditMode && mockTalentData[editId]) {
      setFormData(mockTalentData[editId]);
    }
  }, [isEditMode, editId]);

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

  const handleCancel = () => {
    navigate("/home/talent-profiles");
  };

  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    console.log(isEditMode ? "Updating Talent Profile:" : "Creating Talent Profile:", finalData);
    
    message.success(isEditMode ? "Talent profile updated successfully!" : "Talent profile created successfully!");
    navigate("/home/talent-profiles");
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <AddTalentProfileWrapper>
      <div className="page-header">
        <h1>{isEditMode ? "Edit Talent Profile" : "Add New Talent Profile"}</h1>
        {isEditMode && (
          <span style={{ color: "#666", fontSize: 14, marginLeft: 12 }}>
            Editing: {formData.name}
          </span>
        )}
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
            onCancel={handleCancel}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </AddTalentProfileWrapper>
  );
};

export default AddTalentProfile;
