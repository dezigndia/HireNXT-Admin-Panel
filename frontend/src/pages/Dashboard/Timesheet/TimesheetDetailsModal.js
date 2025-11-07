import React, { useState, useEffect } from "react";
import { Modal, Input, InputNumber, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadModal } from "./Timesheet.style";

const { Dragger } = Upload;

const TimesheetDetailsModal = ({ 
  visible, 
  timesheet, 
  mode = "edit",
  onClose, 
  onSubmit 
}) => {
  const [leaveDateInput, setLeaveDateInput] = useState("");
  const [leaveDates, setLeaveDates] = useState([]);
  const [paidLeaveCount, setPaidLeaveCount] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    if (timesheet && visible) {
      setLeaveDates(timesheet.leaveTaken?.dates || []);
      setPaidLeaveCount(timesheet.paidLeave || 0);
      
      const dateNumbers = (timesheet.leaveTaken?.dates || []).map(dateStr => {
        const date = new Date(dateStr);
        return date.getDate();
      }).join(', ');
      setLeaveDateInput(dateNumbers);
    }
  }, [timesheet, visible]);

  const handleClose = () => {
    setLeaveDateInput("");
    setLeaveDates([]);
    setPaidLeaveCount(0);
    setUploadedFile(null);
    onClose();
  };

  const handleSubmit = () => {
    if (mode === "view") {
      handleClose();
      return;
    }

    if (!uploadedFile && mode === "edit") {
      message.warning("Please upload a timesheet file");
      return;
    }

    onSubmit({
      leaveDates,
      paidLeaveCount,
      uploadedFile
    });

    handleClose();
  };

  const handleLeaveDateChange = (e) => {
    const inputValue = e.target.value;
    setLeaveDateInput(inputValue);
    
    const dateNumbers = inputValue.split(',').map(d => d.trim()).filter(d => d && !isNaN(Number(d)));
    const dates = dateNumbers.map(day => {
      const dayNum = parseInt(day, 10);
      const monthIndex = timesheet.month === "January" ? 0 : 
                        timesheet.month === "February" ? 1 :
                        timesheet.month === "March" ? 2 :
                        timesheet.month === "April" ? 3 :
                        timesheet.month === "May" ? 4 :
                        timesheet.month === "June" ? 5 :
                        timesheet.month === "July" ? 6 :
                        timesheet.month === "August" ? 7 :
                        timesheet.month === "September" ? 8 :
                        timesheet.month === "October" ? 9 :
                        timesheet.month === "November" ? 10 : 11;
      return new Date(timesheet.year, monthIndex, dayNum).toISOString().split('T')[0];
    });
    setLeaveDates(dates);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv,.xlsx,.xls",
    beforeUpload: (file) => {
      const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                     file.type === "application/vnd.ms-excel" ||
                     file.type === "text/csv";
      if (!isExcel) {
        message.error("You can only upload Excel or CSV files!");
        return Upload.LIST_IGNORE;
      }
      setUploadedFile(file);
      return false;
    },
    onRemove: () => {
      setUploadedFile(null);
    },
    fileList: uploadedFile ? [uploadedFile] : [],
  };

  if (!timesheet) return null;

  const clampedPaidLeave = Math.min(paidLeaveCount, leaveDates.length);
  const unpaidLeaveDays = leaveDates.length - clampedPaidLeave;
  const calculatedWorkingDays = timesheet.actualWorkingDays - unpaidLeaveDays;
  const calculatedBillableHours = calculatedWorkingDays * 8;
  const calculatedAmount = (timesheet.monthlyRate / timesheet.actualWorkingDays) * calculatedWorkingDays;

  const isReadOnly = mode === "view";

  return (
    <Modal
      title={`${mode === "view" ? "View" : "Upload"} Timesheet - ${timesheet.talentName}`}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleClose}
      width={800}
      okText={mode === "view" ? "Close" : "Submit Timesheet"}
      cancelButtonProps={{ style: mode === "view" ? { display: "none" } : {} }}
    >
      <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 8 }}>
        <UploadModal>
          <div>
            <div className="form-group">
              <label>Talent Details</label>
              <div style={{ padding: "12px 16px", background: "#f8f9fd", borderRadius: 6 }}>
                <div><strong>Role:</strong> {timesheet.role}</div>
                <div><strong>Client:</strong> {timesheet.clientName}</div>
                <div><strong>Month:</strong> {timesheet.month} {timesheet.year}</div>
                <div><strong>Actual Working Days in Month:</strong> {timesheet.actualWorkingDays} days</div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 16 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Leave Information
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
                    Leave Dates (e.g., 5, 10, 15)
                  </label>
                  <Input
                    placeholder="Enter date numbers separated by commas"
                    value={leaveDateInput}
                    onChange={handleLeaveDateChange}
                    disabled={isReadOnly}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
                    Paid Leave Count
                  </label>
                  <InputNumber
                    min={0}
                    max={leaveDates.length}
                    value={paidLeaveCount}
                    onChange={(value) => setPaidLeaveCount(value || 0)}
                    style={{ width: "100%" }}
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ padding: 16, background: "#fff5e6", borderRadius: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#014c75", marginBottom: 12 }}>
                  Leave Breakdown
                </div>
                <div style={{ fontSize: 13, lineHeight: "1.8" }}>
                  <div><strong>Total Leave Days:</strong> {leaveDates.length}</div>
                  <div><strong>Paid Leave:</strong> {clampedPaidLeave}</div>
                  <div style={{ color: "#ff6b6b" }}><strong>Unpaid Leave:</strong> {unpaidLeaveDays}</div>
                </div>
              </div>

              <div style={{ padding: 16, background: "#e7f6f2", borderRadius: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#014c75", marginBottom: 12 }}>
                  Billable Calculations
                </div>
                <div style={{ fontSize: 13, lineHeight: "1.8" }}>
                  <div><strong>Working Days:</strong> {calculatedWorkingDays} days</div>
                  <div><strong>Billable Hours:</strong> {calculatedBillableHours} hrs</div>
                  <div style={{ color: "#00d9a9", fontWeight: 600 }}>
                    <strong>Amount:</strong> ₹ {Math.round(calculatedAmount).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            {!isReadOnly && (
              <>
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label>Upload Timesheet File</label>
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: "#00d9a9" }} />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for Excel (.xlsx, .xls) or CSV files only
                    </p>
                  </Dragger>
                </div>

                <div style={{ marginTop: 16, padding: 12, background: "#e7f6f2", borderRadius: 6, fontSize: 13 }}>
                  <strong style={{ color: "#014c75" }}>Note:</strong> The working days and amount will be adjusted based on the leave information provided. The uploaded timesheet will be validated before submission.
                </div>
              </>
            )}
          </div>
        </UploadModal>
      </div>
    </Modal>
  );
};

export default TimesheetDetailsModal;
