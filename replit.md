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
- **Account Module:** Shared tabbed interface across all panels (Admin, Partner, Customer) with user profile management and user invitation functionality.
- **User Dashboards:**
    - **Customer Dashboard:** Provides overview metrics, talent search, job management ("My Jobs", "Post Job", "Job Details"), candidate management ("Submitted Profiles", "Talents Hired"), timesheet approval, and finance management (invoice approval and review) with partner confidentiality.
    - **Partner Dashboard:** Offers partner-specific metrics, job submission management ("Ongoing Jobs", "Submit Profiles"), talent management ("Talent Details", "Bench Pool", "Talents Hired"), timesheet upload/modification, and client billing ("Finance") with customer information confidentiality.
    - **Admin Dashboard:** Features comprehensive overview metrics, user management, timesheet management (upload, manage, approve), talent profile management (add/edit, skill management, document uploads), job requirement management, contract management ("Talents Hired"), a four-tab approval process for various submissions, and a comprehensive five-tab finance management hub (Client Billing, Partner Payables, Invoice Reconciliation, Revenue Analysis, Financial Insights).
- **Settings Module:** Provides configuration for role-based access control and system-wide settings with 3-tab architecture:
    - **Global Settings:** Client Markup (15%), Partner Deduction (10%), Working Days/Hours, Default Currency with live USD to INR exchange rate (Frankfurter API), Paid Leave per Month (default 1 day), and Email Settings for HireNXT team notifications (Interview Scheduling, Hiring Alerts, Job Alerts).
    - **Client Specific Configurations:** Client-level overrides for Markup, Working Days/Hours, Currency, and Paid Leave per Month with table view and edit modals.
    - **Partner Specific Configuration:** Partner-level overrides for Deduction, Working Days/Hours, and Currency with table view and edit modals.
- **4-Status Verification Workflow:** Implements a `pending → submitted → verified → approved/paid` workflow for financial documents (invoices, timesheets) across Admin, Partner, and Customer modules, enhancing control and auditability.
- **Customer Module Enhancements:** Includes redesigns for "My Jobs" (button-based Active/Inactive tabs, edit/close job actions with confirmations), enhanced "Job Details - Profiles Submitted" workflow (interview scheduling with confirmation, cancellation with reason modal, status tracking, View Job Details button in header), dedicated "View Job Details" page matching Partner module's job detail structure (full job info with metrics, skills, and description), dynamic "Post Job / Edit Job" functionality with Cancel button and Admin-style progress markers (bordered steps with color-coded states), revamped "Submitted Profiles" section (status lifecycle: Under Review → Interview Scheduled → Hired/Rejected, dynamic action menus based on status, removed Profile ID column), and "Talents Hired" with Partner-style Active/Inactive button tabs with counts and metrics cards (Active Monthly Billing, Avg per Talent, Total Cost Saved, Total Billed / Market Rate). Settings option is hidden from Customer sidebar (accessible to Admin/Partner only).

**System Design Choices:**
- **Frontend-only Repository:** Focuses solely on the React frontend.
- **External Backend:** Communicates with an external RESTful API.
- **Environment Configuration:** Uses `.env` files for environment-specific variables.
- **Shared Components:** Reusable components (e.g., Account module) stored in `src/components/` for DRY principles across all panels.

## External Dependencies
- **Backend API:** An external RESTful API hosted on Azure: `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`.
- **Axios:** For HTTP requests.
- **Ant Design (antd):** UI library.
- **React Router DOM:** For client-side routing.
- **Styled Components:** For component-scoped CSS.
- **React Quill:** Rich text editor.