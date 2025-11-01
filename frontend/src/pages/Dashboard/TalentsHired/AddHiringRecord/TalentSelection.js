import React, { useState, useEffect } from "react";
import { Form, Select, Button } from "antd";

const { Option } = Select;

const TalentSelection = ({ initialData, onNext, isFirstStep }) => {
  const [form] = Form.useForm();
  const [selectedPartner, setSelectedPartner] = useState(initialData.partnerOrganization);
  const [selectedTalent, setSelectedTalent] = useState(initialData.talentProfile);
  const [talentInfo, setTalentInfo] = useState({
    budget: initialData.talentBudget || "",
    location: initialData.talentLocation || "",
  });

  const partnerOrganizations = [
    { id: "P001", name: "Tech Solutions Pvt Ltd" },
    { id: "P002", name: "Digital Innovations Inc" },
    { id: "P003", name: "Cloud Systems Corp" },
    { id: "P004", name: "Software Experts Ltd" },
    { id: "P005", name: "DevOps Masters" },
  ];

  const talentsByPartner = {
    "P001": [
      { id: "T001", name: "Rajesh Kumar", email: "rajesh.kumar@email.com", budget: "150000", location: "Bangalore, Karnataka" },
      { id: "T002", name: "Priya Sharma", email: "priya.sharma@email.com", budget: "165000", location: "Pune, Maharashtra" },
    ],
    "P002": [
      { id: "T003", name: "Amit Patel", email: "amit.patel@email.com", budget: "140000", location: "Ahmedabad, Gujarat" },
      { id: "T004", name: "Sneha Reddy", email: "sneha.reddy@email.com", budget: "170000", location: "Hyderabad, Telangana" },
    ],
    "P003": [
      { id: "T005", name: "Vikram Singh", email: "vikram.singh@email.com", budget: "180000", location: "Delhi, NCR" },
      { id: "T006", name: "Anjali Gupta", email: "anjali.gupta@email.com", budget: "155000", location: "Mumbai, Maharashtra" },
    ],
    "P004": [
      { id: "T007", name: "Karthik Iyer", email: "karthik.iyer@email.com", budget: "160000", location: "Chennai, Tamil Nadu" },
      { id: "T008", name: "Meera Nair", email: "meera.nair@email.com", budget: "145000", location: "Kochi, Kerala" },
    ],
    "P005": [
      { id: "T009", name: "Arjun Verma", email: "arjun.verma@email.com", budget: "175000", location: "Bangalore, Karnataka" },
      { id: "T010", name: "Divya Menon", email: "divya.menon@email.com", budget: "150000", location: "Pune, Maharashtra" },
    ],
  };

  const handlePartnerChange = (partnerId) => {
    setSelectedPartner(partnerId);
    setSelectedTalent("");
    setTalentInfo({ budget: "", location: "" });
    form.setFieldsValue({
      talentProfile: undefined,
    });
  };

  const handleTalentChange = (talentId) => {
    setSelectedTalent(talentId);
    const talents = talentsByPartner[selectedPartner] || [];
    const talent = talents.find(t => t.id === talentId);
    
    if (talent) {
      setTalentInfo({
        budget: talent.budget,
        location: talent.location,
      });
    }
  };

  const handleSubmit = (values) => {
    const talents = talentsByPartner[selectedPartner] || [];
    const talent = talents.find(t => t.id === values.talentProfile);
    
    onNext({
      partnerOrganization: values.partnerOrganization,
      talentProfile: values.talentProfile,
      talentEmail: talent?.email || "",
      talentBudget: talentInfo.budget,
      talentLocation: talentInfo.location,
    });
  };

  const availableTalents = selectedPartner ? talentsByPartner[selectedPartner] || [] : [];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialData}
    >
      <div className="two-column-grid">
        <Form.Item
          name="partnerOrganization"
          label="Partner Organization"
          rules={[{ required: true, message: "Please select a partner organization" }]}
        >
          <Select
            placeholder="Select Partner Organization"
            onChange={handlePartnerChange}
            showSearch
            filterOption={(input, option) =>
              (option?.children || "").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {partnerOrganizations.map((partner) => (
              <Option key={partner.id} value={partner.id}>
                {partner.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="talentProfile"
          label="Talent Profile (Email ID - Name)"
          rules={[{ required: true, message: "Please select a talent profile" }]}
        >
          <Select
            placeholder="Select Talent Profile"
            onChange={handleTalentChange}
            disabled={!selectedPartner}
            showSearch
            filterOption={(input, option) =>
              (option?.children || "").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {availableTalents.map((talent) => (
              <Option key={talent.id} value={talent.id}>
                {talent.email} - {talent.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {talentInfo.budget && talentInfo.location && (
        <div className="info-display">
          <div className="info-item">
            <span className="label">Budget (Monthly):</span>
            <span className="value">₹ {parseInt(talentInfo.budget).toLocaleString("en-IN")} / Month</span>
          </div>
          <div className="info-item">
            <span className="label">Location:</span>
            <span className="value">{talentInfo.location}</span>
          </div>
        </div>
      )}

      <div className="form-actions">
        <Button type="primary" htmlType="submit">
          Save & Next
        </Button>
      </div>
    </Form>
  );
};

export default TalentSelection;
