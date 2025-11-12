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
- **User Dashboards:**
    - **Customer Dashboard:** Overview metrics, talent search, "My Jobs" section, "Job Details" with candidate management, "Post Job" wizard, and "Hired Talents" management.
    - **Partner Dashboard:** Overview with partner-specific metrics, "Ongoing Jobs", "Submit Profiles", "Talent Details", "Bench Pool", "Talents Hired", "Timesheet" (upload/modify only, no approval), and "Finance" (client billing only, customer info confidential).
        - **Partner Timesheet:** Simplified timesheet module with upload and modify capabilities only (no approval rights). Features Upload/Modify/View modals using shared TimesheetDetailsModal component from Admin module with mode-based functionality (Upload/Modify mode shows leave management and file upload with real-time calculations; View mode is read-only), two-tab navigation (Pending Upload, Approved), metrics dashboard, and consistent design with Admin module.
        - **Partner Finance:** Single-tab finance module showing only Client Billing (receivables) with customer information kept confidential. Features Upload Invoice modal (invoice number, amount breakup, file upload for PDF/DOC/DOCX), actions (Upload Invoice for pending status, View Breakup, Download Timesheet), metrics (Total Amount, Current Receivable, Overdue Amount, Total Invoices), and consistent search/filter design using Flex layout.
    - **Admin Dashboard:**
        - **Dashboard Overview:** Key metrics (Talents Hired, Partners, Customers, Profiles Submitted, Revenue/Payout), pending approvals, top customers hiring.
        - **User Management:** Comprehensive database management for customer, partner, and admin users.
        - **Timesheet Management:** Upload, manage, and approve timesheets with leave management, automated calculations, and historical views.
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

## External Dependencies
- **Backend API:** An external RESTful API hosted on Azure: `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`.
- **Axios:** For HTTP requests.
- **Ant Design (antd):** UI library.
- **React Router DOM:** For client-side routing.
- **Styled Components:** For component-scoped CSS.
- **React Quill:** Rich text editor.