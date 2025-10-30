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
- **Responsiveness:** Designed to be mobile-friendly with responsive layouts for tables and forms.
- **Interaction Patterns:** Card-based layouts, tabbed navigation, multi-step forms with progress indicators, and interactive tables with filtering, sorting, and action menus.
- **Header Navigation:** Consistent header with profile dropdown for "View Profile", "Change Password", and "Logout".

**Technical Implementations & Feature Specifications:**
- **Authentication:** Role-based access control with `ProtectedRoute` and mock authentication for development.
- **Logout Functionality:** Clears `localStorage` and redirects to the login page from both sidebar and header dropdown.
- **Verification Badges:** Displays Aadhar Card and PAN Card verification status on Talent Details pages.
- **Customer Dashboard:** Features overview metrics, talent search, "My Jobs" section, detailed "Job Details" view with candidate management, a 4-step "Post Job" wizard, and "Hired Talents" management with contract details and actions.
- **Partner Dashboard:** Includes an overview with partner-specific metrics and quick actions. "Ongoing Jobs" displays opportunities with advanced search/filters, a job list, and detailed job view for profile submission. "Submit Profiles" allows adding candidates from a "Bench Pool" or as "New Resources" via comprehensive modals. "Talent Details" provides a shared view of talent profiles. "Bench Pool" offers comprehensive resource management with metric cards, active/inactive tabs, search/filters, bulk actions, and a detailed table. "Talents Hired" manages partner-specific talent contracts with detailed table columns and actions.
- **Admin Dashboard:** Provides comprehensive management sections for User Management, Talent Profiles, Job Requirements, Approval Process, and Role Permissions.

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
- **serve:** Static file server.