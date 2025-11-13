# HireNXT Admin Panel

## Overview
The HireNXT Admin Panel is a React-based application designed to manage the HireNXT platform. Its core purpose is to streamline talent profile management, job requirement handling, user administration, and provide dedicated dashboards for partners and customers. The project aims to centralize critical operations, enhance user experience for talent acquisition, and support efficient resource allocation within the HireNXT ecosystem.

## User Preferences
None specified yet

## System Architecture
The application is a React-based single-page application (SPA) built with Create React App. It utilizes Ant Design for its UI components and Styled Components for styling. React Router DOM handles client-side routing.

**UI/UX Decisions:**
- **Design System:** Ant Design provides a modern and consistent aesthetic.
- **Color Schemes:** Professional layouts with clean white backgrounds, accented by teal/green (`#00d9a9`, `#01c49b`) for active states and highlights, and dark blue (`#014c75`) for primary text. Header background is `#191919`.
- **Responsiveness:** Designed to be mobile-friendly with responsive layouts.
- **Interaction Patterns:** Card-based layouts, tabbed navigation, multi-step forms with progress indicators, and interactive tables with filtering, sorting, and action menus.
- **Standardized UI Patterns (Admin Dashboard):** Consistent tab designs, action button styling, metrics cards, button placement, and page padding across all modules.

**Technical Implementations & Feature Specifications:**
- **Authentication:** Role-based access control with `ProtectedRoute` and mock authentication.
- **Account Module:** Shared tabbed interface across all panels (Admin, Partner, Customer) accessible via dropdown menu "View Account":
    - **My Profile Tab:** User profile form with personal details, company information, and change password functionality.
    - **Invite User Tab:** User invitation management with table showing User Name, Email ID, Mobile Number, Date added, Status (Active/Inactive), and Actions (Delete, Resend invitation, More menu). Features "Invite Users" button to open invitation modal.
- **User Dashboards:**
    - **Customer Dashboard:** Overview metrics, talent search, "My Jobs" section, "Job Details" with candidate management, "Post Job" wizard, "Hired Talents" management, "Timesheet" (approve/view/download/ask to modify only, no upload rights), and "Finance Management" (invoice approval and review).
    - **Partner Dashboard:** Overview with partner-specific metrics, "Ongoing Jobs", "Submit Profiles", "Talent Details", "Bench Pool", "Talents Hired", "Timesheet" (upload/modify only, no approval), and "Finance" (client billing only, customer info confidential).
        - **Partner Submit Profiles:** Job submission management with Withdraw Profile action (confirmation modal before removing submitted profiles from jobs).
        - **Partner Bench Pool:** Talent pool management with View Details modal (displays all talent information) and Edit functionality (allows updating basic profile fields: name, role, location, experience while preserving all system/metric fields).
        - **Partner Timesheet:** Simplified timesheet module with upload and modify capabilities only (no approval rights). Features Upload/Modify/View modals using shared TimesheetDetailsModal component from Admin module with mode-based functionality (Upload/Modify mode shows leave management and file upload with real-time calculations; View mode is read-only), two-tab navigation (Pending Upload, Approved), Finance-style metrics dashboard (Pending Upload, Approved, Total Amount Pending, Total Amount Approved) fixed across tabs, realistic data based on active talents from Talents Hired, and consistent design with Admin module.
        - **Partner Finance:** Single-tab finance module showing only Client Billing (receivables) with customer information kept confidential. Features Upload Invoice modal (invoice number, amount breakup, file upload for PDF/DOC/DOCX), actions (Upload Invoice for pending status, View Breakup, Download Timesheet), metrics (Total Amount, Current Receivable, Overdue Amount, Total Invoices), and consistent search/filter design using Flex layout.
    - **Customer Dashboard:**
        - **Dashboard Overview:** Key metrics for customer operations (My Jobs, Submitted Profiles, Talents Hired, Active Jobs).
        - **Find Talents:** Search and browse available talent pool.
        - **My Jobs:** Job posting management with detailed views.
        - **Submitted Profiles:** Review partner-submitted talent profiles for open positions.
        - **Talents Hired:** Management of hired talents and contracts.
        - **Timesheet Management:** Two-tab system (Pending Approval, Approved) for reviewing partner-submitted timesheets with customer-specific actions and Finance-style metrics (Pending Approval, Approved, Total Amount Pending, Total Amount Approved) fixed across tabs:
            - **Approve:** Approve submitted timesheets for payment processing.
            - **View:** Read-only view of timesheet details using shared TimesheetDetailsModal component.
            - **Download:** Download timesheet files.
            - **Ask to Modify:** Request modifications to submitted timesheets with reason specification.
        - **Finance Management:** Single-tab invoice review system following Admin's Partner Payable pattern with customer-specific actions:
            - **View Details:** Modal showing complete invoice details and breakup.
            - **Download Invoice:** Download partner-submitted invoice files.
            - **Download Timesheet:** Download associated timesheet documentation.
            - **Approve:** Approve invoices for payment processing.
            - **Ask to Modify:** Request invoice modifications with reason specification.
            - **Update Payable:** Toggle invoice status between Paid/Unpaid (available for Approved status only).
            - Metrics dashboard: Total Paid, Current Payable, Pending Approval, Total Invoices.
            - **Partner Confidentiality:** Partner information completely hidden from Customer views (no partner columns in tables, filters, or modals).
    - **Admin Dashboard:**
        - **Dashboard Overview:** Key metrics (Talents Hired, Partners, Customers, Profiles Submitted, Revenue/Payout), pending approvals, top customers hiring.
        - **User Management:** Comprehensive database management for customer, partner, and admin users.
        - **Timesheet Management:** Upload, manage, and approve timesheets with leave management, automated calculations, and historical views. Features Finance-style metrics (Pending Upload, Approved, Total Amount Pending, Total Amount Approved) fixed across tabs.
        - **Talent Profiles:** Database management with add/edit functionality via a 2-step wizard, including skill management and document uploads.
        - **Job Requirements:** Management of job postings with detailed views and edit capabilities.
        - **Talents Hired:** Contract management with advanced search/filters and a 2-step hiring record wizard.
        - **Approval Process:** Four-tab system for pending Partner/Customer registrations, Job Posts, Talent Profile submissions, and Timesheet submissions, with individual and bulk approve/reject actions.
        - **Finance Management:** Comprehensive five-tab hub for:
            - **Client Billing (Receivables):** Talent billing, invoice upload, and tracking.
            - **Partner Payables:** Partner invoice management and payment tracking.
            - **Invoice Reconciliation:** Matching receivables with payables, with fee modification capabilities.
            - **Revenue Analysis:** Profit analysis based on talent costs and fees.
            - **Financial Insights:** Dashboard with key financial metrics and performance indicators.
        - **Role Permissions:** Configuration for role-based access control.

**System Design Choices:**
- **Frontend-only Repository:** Focuses solely on the React frontend.
- **External Backend:** Communicates with an external RESTful API.
- **Environment Configuration:** Uses `.env` files for environment-specific variables.
- **Shared Components:** Reusable components (Account module) stored in `src/components/` for DRY principles across all panels.
- **Recent Changes (Nov 2025):**
    - Renamed "Profile" to "Account" across all dashboards
    - Added Invite User functionality with tabbed interface
    - Implemented partner confidentiality in Customer Finance/Timesheet modules
    - Added Update Payable action for Customer Finance (Approved invoices only)
    - Updated Timesheet metrics across all panels (Admin, Partner, Customer) to match Finance module styling with fixed positioning across tabs
    - Added "Total Amount Approved" metric and renamed "Total Amount" to "Total Amount Pending" in all Timesheet modules
    - Implemented Withdraw Profile action in Partner Submit Profiles with confirmation modal
    - Added View Details and Edit functionality to Partner Bench Pool (Edit allows updating basic fields while preserving system data)
    - Updated Partner Timesheet with realistic data based on 4 active talents from Talents Hired
    - Renamed Partner Finance heading from "Finance - Client Billing" to "Finance"
    - Removed Settings from Partner sidebar navigation (commented out for potential future use)

## External Dependencies
- **Backend API:** An external RESTful API hosted on Azure: `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`.
- **Axios:** For HTTP requests.
- **Ant Design (antd):** UI library.
- **React Router DOM:** For client-side routing.
- **Styled Components:** For component-scoped CSS.
- **React Quill:** Rich text editor.