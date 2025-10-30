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
- **Admin Dashboard:** Comprehensive management hub featuring:
    - **Dashboard Overview:** Modern redesigned home page with:
      - **8 Key Metrics Cards** (2 rows × 4 cards) displaying Total Talents Hired (150), Total Partners Joined (500), Total Customers Onboarded (100), Total Profiles Submitted (750), Total Estimated Revenue (₹ 20 cr), Total Estimated Payout Amount (₹ 10 cr), Average Revenue per Customer (₹ 50 lac), and Average Cost per Talent (₹ 2 lac). Each card features large bold numbers in primary blue (#014c75), descriptive labels, and color-coded icons.
      - **Approvals Pending Section** with "View All" link, displaying 4 actionable items: New Customer onboarded (100), New Partners onboarded (205), New Talent Profiles Created (178), and Profiles Submitted for Jobs (52). Each item features an icon, count, description, and right arrow for navigation.
      - **Top Customers Hiring Talents Table** with "View All" link, showing top 5 customers with columns for Customer Name (with building icon), Talents Hired count, and Per Talent Average (highlighted in primary blue).
      - **Clean Header** with logo on the left and profile avatar dropdown in teal (#00d9a9) on the right. Search bar and notification icon removed as not currently needed.
    - **User Management:** Comprehensive user database management
    - **Talent Profiles:** Talent profile database management
    - **Job Requirements:** Job posting and requirement management
    - **Approval Process:** Comprehensive three-tab approval system for managing pending approvals:
      - **Partners/Customers Tab:** Displays pending partner and customer registrations with columns for Name, Type (Partner/Customer tag), Contact Person, Email, Phone, Location, Registered On, and Status. Includes Approve/Reject actions for individual items and bulk approve functionality for selected items.
      - **Talent Profiles Tab:** Shows pending talent profile submissions with columns for Name, Role, Skills, Experience, Location, Monthly Rate, Partner Organization, Submitted On, and Status. Features Approve/Reject actions and bulk approve capability.
      - **Job Posts Tab:** Lists pending job postings with columns for Job Title, Company, Location, Experience, Skills, Budget Range, Positions, Posted On, and Status. Supports individual and bulk approve operations.
      - **Reject with Comment:** When rejecting any item, a modal requires a detailed comment (minimum 10 characters) explaining the rejection reason. Bulk reject is not supported to ensure thoughtful individual rejections.
      - **Status Management:** Upon approval, items become active (Partner/Customer profile, Talent profile, or Job Description). Each tab displays pending count badges for quick visibility.
      - **Design Aesthetics:** Tabs use teal/green (#00d9a9) for active state, matching the overall app design. Tables feature dark blue (#014c75) headers with white text, and action buttons use green (#52c41a) for approve and red (#ff4d4f) for reject.
    - **Role Permissions:** Configure role-based access control

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