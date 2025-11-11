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
- **Logout Functionality:** Clears `localStorage` and redirects to the login page.
- **Verification Badges:** Displays Aadhar Card and PAN Card verification status on Talent Details pages.
- **Customer Dashboard:** Features overview metrics, talent search, "My Jobs" section, detailed "Job Details" view with candidate management, a 4-step "Post Job" wizard, and "Hired Talents" management.
- **Partner Dashboard:** Includes an overview with partner-specific metrics, "Ongoing Jobs" with advanced search/filters, "Submit Profiles" for adding candidates, "Talent Details" view, "Bench Pool" for resource management, and "Talents Hired" for contract management.
- **Admin Dashboard:** Comprehensive management hub featuring:
    - **Dashboard Overview:** Modernized home page with key metrics cards (Total Talents Hired, Total Partners, Total Customers, Total Profiles Submitted, Estimated Revenue/Payout, Avg. Revenue per Customer, Avg. Cost per Talent), approvals pending section, and top customers hiring talents table.
    - **User Management:** Comprehensive user database management with metrics cards and consistent UI for customer, partner, and admin users.
    - **Timesheet Management:** Upload and manage timesheets for onboarded talents with features including:
      - Two-tab navigation: Pending Upload, Approved (Submitted timesheets moved to Approval Process)
      - Historical view mode: When "View All History" is active, tabs are hidden and only Approved records are shown
      - Metrics dashboard: Pending Upload count, Approved count, Total Amount (compact cards with 14-16px padding)
      - Automated timesheet calculations: working days (actualWorkingDays - unpaidLeaveDays), billable hours (working days × 8), calculated amount based on monthly rate
      - CSV/Excel file upload using Ant Design Dragger component (.csv, .xlsx, .xls formats)
      - Consistent search bar (Flex layout, 300px width, SearchOutlined prefix icon)
      - Historical view toggle: "View All History" button with Year, Month, and Partner dropdown filters - shows only approved timesheets with View and Download actions
      - Advanced leave management in upload modal:
        - Simplified leave dates input: just enter date numbers (e.g., "5, 10, 15") instead of full dates
        - Paid leave count input (clamped to not exceed total leave days)
        - Real-time calculation preview in side-by-side layout: Leave breakdown (left) and Billable calculations (right)
        - Formula: unpaidLeaveDays = totalLeave - paidLeave; workingDays = actualWorkingDays - unpaidLeaveDays
        - Modal has inner scroll (maxHeight: 60vh) for better UX
      - Status-specific action menus: Pending (Upload, Delete), Approved (View, Modify, Reject, Delete)
      - Upload modal with talent details, drag-and-drop file upload, and leave management
      - Table columns: Talent Name, Role, Partner, Client Name, Month (shows "Month YYYY (XX days)" format with actual working days), Leave Taken (count with date tooltips), Working Days, Billable Hours, Amount, Status, Action
      - State-based data persistence: Leave information persists correctly after modal submission using React state
    - **Talent Profiles:** Talent profile database management with metrics, active/inactive tabs, detailed table columns, and action menus (View Document, Edit, Mark Inactive, Delete).
      - **Add New Profile:** 2-step wizard for adding talent profiles (matching Partner module's structure):
        - **Step 1 - Basic Information:** Partner Organization (dropdown from 8 organizations), Name, Role (dropdown with 11 options), Technical Skills (dynamic Form.List with skill name and proficiency level: Expert/Advanced/Intermediate/Beginner), Experience (Years + Months), Monthly Rate, Notice Period, Email, Phone, Location (dropdown), Availability (dropdown)
        - **Step 2 - Additional Information:** Resume Upload (mandatory - .pdf, .doc, .docx), Professional Summary (optional textarea), Project Experience (dynamic Form.List with project cards containing Project Title, Client, Duration, Role, Technologies, Description), Document Uploads (Aadhar Card, PAN Card, Degree Proof - all optional)
        - **Design Consistency:** Uses brand colors (#014c75, #00d9a9) with step progress indicator matching overall app aesthetics. Technical skills rendered as dynamic form list with add/remove functionality. Project cards displayed with gray background (#fafafa) and structured layout. Submit button disabled until Resume is uploaded.
    - **Job Requirements:** Job posting and requirement management with metrics, three-tab navigation (Active Jobs, Profiles Submitted, Jobs Fulfilled), detailed job view pages, and an edit job modal. Includes advanced search and filtering for profiles.
    - **Talents Hired:** Comprehensive talent contract management with metrics cards, active/inactive tabs, advanced search and filter functionality (by name, role, location, experience), a detailed table, and a 2-step wizard for adding new hiring records.
    - **Approval Process:** Four-tab approval system for pending Partner/Customer registrations, Job Posts, Talent Profile submissions, and Timesheet submissions, with individual approve/reject actions (reject requires a comment) and bulk approve functionality. Features dynamic status badges, consistent filtering, and tab-specific search/filter options (Users: filter by Type; Profiles: filter by Role/Location; Jobs: filter by Location/Experience; Timesheet: filter by Partner/Month).
    - **Finance Management:** Comprehensive financial operations hub with five-tab navigation for managing billing, payments, reconciliation, revenue analysis, and financial insights. Positioned above Approval Process in sidebar.
      - **Client Billing (Receivables):** Active talent billing management with columns for Talent ID, Talent Name, Role, Partner, Customer, Month, Days, Hrs, Amount, GST (18%), Total Amount, Timesheet Status, Invoice Status. Actions prioritized with Upload Invoice at top (disabled for Sent/Paid invoices), followed by View Breakup and Download Timesheet. Upload Invoice modal features auto-populated talent details, auto-generated invoice number (editable), amount breakup (base amount based on working days, automatic 18% GST, total), and drag-and-drop file upload for PDF/DOC/DOCX invoice documents with validation. Metrics: Total Amount, Current Receivable, Overdue Amount, Total Invoices. Filters with FilterOutlined icon in placeholders by Partner, Customer, Month, Year, and Status. Search bar (300px width, SearchOutlined prefix) using standard Flex layout pattern consistent with other modules.
      - **Partner Payables:** Partner invoice management with columns for Record ID, Invoice ID, Talent ID, Talent Name, Partner, Job ID, Days, Hours, Amount, GST, Total Amount, Status. Actions include View, Download Invoice, Download Timesheet, Approve, Modify, Reject. Metrics: Total Paid, Current Payable, Overdue Payable, Total Invoices. Filters by Partner, Month, Year, and Status with FilterOutlined icons. Search bar using standard Flex layout.
      - **Invoice Reconciliation:** Matches receivables with payables for each talent with columns for Talent ID, Talent Name, Partner, Record ID, Partner Invoice ID, Job ID, Customer, Customer Invoice ID, Receivable Status, Payable Status. Actions include View Breakup, Modify Fee (percentage-based modal), Update Receivable, Update Payable. Modify Fee modal features talent base cost display, percentage-based fee configuration (Client Fee % Markup, Partner Fee % Deduction), real-time auto-calculated amounts (Client Amount, Partner Amount, Revenue), and defaults to 10% client markup and 5% partner deduction (will be auto-populated from Admin Settings in future). Metrics: Total Invoice Paid, Total Bills Paid, Receivable Invoice Pending, Payable Pending. Filters by Partner, Customer, Month, Year, and Status with FilterOutlined icons. Search bar using standard Flex layout.
      - **Revenue Analysis:** Profit analysis showing revenue calculations (Receivable = talent cost × 1.10, Payable = talent cost × 0.95) with columns for Talent ID, Talent Name, Partner, Job ID, Customer, Revenue, Amount Receivable, GST IN, Amount Payable, GST OUT. Actions include View Transaction only (Modify Record removed as records cannot be modified). Metrics: Total Invoice Paid, Total Bills Paid, Receivable Invoice Pending, Payable Pending (matching Invoice Reconciliation). Filters by Customer, Month, and Year with FilterOutlined icons. Search bar using standard Flex layout.
      - **Financial Insights:** Enhanced dashboard with 6 insight cards: Top Customers by Revenue, Top Partners by Volume, Revenue vs Costs (with profit margin %), Payment Status Summary (receivables/payables breakdown), GST Analysis (GST IN/OUT with liability), and Monthly Performance (with growth %). Metrics: Total Receivable, Total Payable, Net Cash Flow, Total Net Revenue. No table view, visualization-focused with detailed metrics cards. Filters by Period (Monthly, Quarterly, Yearly) and Year with FilterOutlined icons.
      - **Design Features:** Pixel-based table column widths for stability, full currency display with toLocaleString formatting (₹1,50,000), consistent brand colors (#014c75, #00d9a9), responsive metrics cards, action modals with Ant Design Descriptions component, automated GST calculations at 18%. Consistent search/filter design across all tabs using Flex layout with gap="middle", SearchOutlined prefix (300px width), FilterOutlined icons in filter placeholders, and standardized filter widths (220px, 200px, 180px, 150px). Year filter added across all tabs for better data filtering.
    - **Role Permissions:** Configuration for role-based access control.

**System Design Choices:**
- **Frontend-only Repository:** Focuses solely on the React frontend.
- **External Backend:** Communicates with an external RESTful API.
- **Environment Configuration:** Uses `.env` files for environment-specific variables.

## External Dependencies
- **Backend API:** An external RESTful API hosted on Azure: `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`.
- **Axios:** For HTTP requests.
- **Ant Design (antd):** UI library.
- **React Router DOM:** For client-side routing.
- **Styled Components:** For component-scoped CSS.
- **React Quill:** Rich text editor.