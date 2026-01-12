import React, { useEffect, useState } from "react";
import { Row, Col, InputNumber, Select, TimePicker } from "antd";

const WorkPreferenceForm = ({ formData, onChange, setIsValid }) => {
  const [shiftTiming, setShiftTiming] = useState(formData.shiftTiming || null);

  useEffect(() => {
    const validateForm = () => {
      const isTimezoneValid = formData.timezone && formData.timezone.length > 0;
      const isWorkingHoursValid =
        formData.workingHours &&
        formData.workingHours > 0 &&
        formData.workingHours <= 168;
      const isTravelValid = formData.travel && formData.travel.length > 0;
      const isDeviceValid =
        formData.device !== undefined && formData.device !== null;
      const isToolsValid = formData.tools && formData.tools.length > 0;
      const isShiftTimingValid = formData.shiftTiming && formData.shiftTiming.length > 0;
      
      let isCustomShiftValid = true;
      if (formData.shiftTiming === "Custom") {
        isCustomShiftValid = formData.shiftStart && formData.shiftEnd;
      }

      setIsValid(
        isTimezoneValid &&
          isWorkingHoursValid &&
          isTravelValid &&
          isDeviceValid &&
          isToolsValid &&
          isShiftTimingValid &&
          isCustomShiftValid
      );
    };

    validateForm();
  }, [formData, setIsValid]);

  const workingTimeZones = [
    "IST (Indian Standard Time)",
    "EST (Eastern Standard Time)",
    "PST (Pacific Standard Time)",
    "GMT (Greenwich Mean Time)",
    "CST (Central Standard Time)",
    "JST (Japan Standard Time)",
    "AEST (Australian Eastern Standard Time)",
  ];

  const travelPreferences = [
    "Remote",
    "Hybrid",
    "On-site",
    "Willing to Travel",
    "Not Specified",
  ];

  const systemProvision = [
    "Yes - Laptop",
    "Yes - Desktop",
    "Yes - Both",
    "Not Specified",
    "No",
  ];

  const toolsOptions = [
    "Agile Practice",
    "Scrum",
    "Kanban",
    "Waterfall",
    "Jira",
    "Trello",
    "Asana",
    "Monday.com",
    "Slack",
    "Microsoft Teams",
    "Not Specified",
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <label>Timezone *</label>
          <Select
            placeholder="Select Timezone"
            style={{ width: "100%" }}
            showSearch
            value={formData.timezone}
            onChange={(value) => onChange("timezone", value)}
            options={workingTimeZones.map((zone) => ({ label: zone, value: zone }))}
          />
        </Col>
        <Col span={6}>
          <label>No of Working hours/week *</label>
          <InputNumber
            placeholder="40"
            min={1}
            max={168}
            value={formData.workingHours}
            onChange={(value) => onChange("workingHours", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={6}>
          <label>Travel Preference *</label>
          <Select
            placeholder="Remote"
            value={formData.travel}
            onChange={(value) => onChange("travel", value)}
            style={{ width: "100%" }}
            options={travelPreferences.map((pref) => ({ label: pref, value: pref }))}
          />
        </Col>
        <Col span={6}>
          <label>Do you provide System *</label>
          <Select
            placeholder="Not Specified"
            value={formData.device}
            onChange={(value) => onChange("device", value)}
            style={{ width: "100%" }}
            options={systemProvision.map((opt) => ({ label: opt, value: opt }))}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <label>Tools Used to Manage *</label>
          <Select
            mode="multiple"
            placeholder="Select tools"
            style={{ width: "100%", minHeight: 60 }}
            showSearch
            value={formData.tools}
            onChange={(value) => onChange("tools", value)}
            options={toolsOptions.map((tool) => ({ label: tool, value: tool }))}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={6}>
          <label>Shift Timing *</label>
          <Select
            placeholder="Select Shift Timing"
            style={{ width: "100%" }}
            value={formData.shiftTiming}
            onChange={(value) => {
              setShiftTiming(value);
              onChange("shiftTiming", value);
              if (value !== "Custom") {
                onChange("shiftStart", null);
                onChange("shiftEnd", null);
              }
            }}
            options={[
              { label: "Morning (6 AM to 3 PM)", value: "Morning" },
              { label: "General (9 AM to 6 PM)", value: "General" },
              { label: "Custom", value: "Custom" },
            ]}
          />
        </Col>

        {shiftTiming === "Custom" && (
          <>
            <Col span={6}>
              <label>Shift Start *</label>
              <TimePicker
                format="h:mm A"
                use12Hours
                style={{ width: "100%" }}
                placeholder="Select start time"
                value={formData.shiftStart}
                onChange={(time) => onChange("shiftStart", time)}
              />
            </Col>
            <Col span={6}>
              <label>Shift End *</label>
              <TimePicker
                format="h:mm A"
                use12Hours
                style={{ width: "100%" }}
                placeholder="Select end time"
                value={formData.shiftEnd}
                onChange={(time) => onChange("shiftEnd", time)}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default WorkPreferenceForm;
