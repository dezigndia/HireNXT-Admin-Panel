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
- **Standardized UI Patterns (Admin Dashboard):**
  - **Tab Design:** Consistent `TabsContainer` styling across all Admin modules (Roles & Permissions, User Management, Talent Profiles, Job Requirements, and Talents Hired). Simple, clean button-style tabs with 48px height, teal (#00d9a9) active state, hover effects, and rounded corners for uniform navigation experience.
  - **Action Buttons:** All "Add" buttons (Add New Role, Add New Permission, Add New User, Add New Profile, Add New Job, Add Hiring Record) share unified styling with #00d9a9 background, PlusOutlined icon, and 40px height.
  - **Metrics Cards:** Avatar-based `MetricsContainer` design pattern used consistently across all Admin pages with color-coded icons (blue, orange, green backgrounds) and large bold numbers in primary blue (#014c75).
  - **Button Placement:** Action buttons positioned above tables (after tabs) for consistent UX across all Admin modules.
  - **Page Padding:** Standardized padding of 40px 48px across all Admin pages (Dashboard Overview, Roles & Permissions, User Management, Talent Profiles, Job Requirements, Talents Hired, and Approval Process) ensuring consistent spacing from the side panel menu.

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
    - **User Management:** Comprehensive user database management with Avatar-based metrics cards (Total Users, Admins, Customers, Partners), consistent TabsContainer design with tabs ordered as Customer, Partner, Admin, and unified Add New User button styling
    - **Talent Profiles:** Talent profile database management with:
      - **Metrics Cards:** Total Profiles, Active Profiles, and Inactive Profiles using Avatar-based design
      - **Active/Inactive Tabs:** Clean button-style tabs for filtering profiles by status
      - **Table Columns:** Name, Email ID, Contact No, Organization, Rate, Experience, Created on, Background Verified, and Action
      - **Action Menu:** View Document, Edit, Mark Inactive, and Delete options accessed via dropdown menu with MoreOutlined icon
      - **Unified Add New Profile button styling** with teal (#00d9a9) background
    - **Job Requirements:** Job posting and requirement management with Avatar-based metrics cards (Active Jobs, Profiles Submitted, Jobs Fulfilled), consistent TabsContainer design, and unified Add New Job button styling. Includes data transformation layer to map legacy API types ("User to Review", "Job to Review", "Profile to Review") to new tab labels ("Active Jobs", "Profiles Submitted", "Jobs Fulfilled") for backward compatibility
    - **Talents Hired:** Comprehensive talent contract management with:
      - **Metrics Cards** displaying Total Active Talents, Total Revenue Generated, and Average Contract Value using Avatar icons matching Bench Pool design
      - **Active/Inactive Tabs** with dynamic counts for contract status filtering
      - **Search & Filter Functionality:** Advanced filtering capabilities with:
        - **Search Bar** (300px width): Searches by talent name or role with real-time filtering
        - **Filter by Role:** Dropdown with 6 role options (React Developer, Full Stack Developer, Backend Developer, etc.) using exact match
        - **Filter by Location:** Dropdown with 5 location options (Bangalore, Mumbai, Pune, Hyderabad, Delhi) using exact match
        - **Filter by Experience:** Dropdown with 6 experience options (4, 5, 6, 7, 8, 10 Years) using substring match
        - **Combined Filtering:** All filters work independently and in combination with search
        - **Visual Design:** FilterOutlined icon in filter placeholders, allowClear option on all dropdowns, Flex layout with gap="middle"
      - **Detailed Table** showing Name, Role, Experience, Onboarding Date, Contract Duration, Last Working Day, Days Left, Monthly Salary (₹X,XXX / Month format), Total Billed, and Actions
      - **Non-navigating Implementation** - No talent detail navigation as it's not currently needed for Admin role
      - **Add Hiring Record:** 2-step wizard for creating new hiring records:
        - **Step 1 - Talent Selection:** Select Partner Organization, then Talent Profile (email + name). Budget and Location auto-populate from selected talent.
        - **Step 2 - Contract Details:** Select Customer Name, then Job ID (with job title). Engagement Type and Location fields. Onboarding Date and Contract Duration inputs with auto-calculation of Last Working Day. Final Cost Per Month entry.
        - **Form Persistence:** Full data persistence across forward/backward navigation between steps
        - **Design Consistency:** Uses brand colors (#014c75, #00d9a9) with step progress indicator matching overall app aesthetics
    - **Approval Process:** Comprehensive three-tab approval system for managing pending approvals:
      - **Partners/Customers Tab:** Displays pending partner and customer registrations with columns for Name, Type (Partner/Customer tag), Contact Person, Email, Phone, Location, Registered On, and Status. Includes Approve/Reject actions for individual items and bulk approve functionality for selected items.
        - **Search & Filter:** Search by name, contact person, or email. Filter by Type (Partner/Customer) and Location (exact match). All filters use allowClear and reset when switching tabs.
      - **Talent Profiles Tab:** Shows pending talent profile submissions with columns for Name, Role, Skills, Experience, Location, Monthly Rate, Partner Organization, Submitted On, and Status. Features Approve/Reject actions and bulk approve capability.
        - **Search & Filter:** Search by name, role, or skills. Filter by Role (exact match) and Location (exact match). Filters dynamically reset on tab change.
      - **Job Posts Tab:** Lists pending job postings with columns for Job Title, Company, Location, Experience, Skills, Budget Range, Positions, Posted On, and Status. Supports individual and bulk approve operations.
        - **Search & Filter:** Search by job title, company, or skills. Filter by Location (exact match) and Experience ("4+ years", "5+ years", "6+ years" format with exact match). Tab-specific filters clear when switching tabs.
      - **Reject with Comment:** When rejecting any item, a modal requires a detailed comment (minimum 10 characters) explaining the rejection reason. Bulk reject is not supported to ensure thoughtful individual rejections.
      - **Status Management:** Upon approval, items become active (Partner/Customer profile, Talent profile, or Job Description). Each tab displays pending count badges for quick visibility.
      - **Design Aesthetics:** Tabs use teal/green (#00d9a9) for active state, matching the overall app design. Tables feature dark blue (#014c75) headers with white text, and action buttons use green (#52c41a) for approve and red (#ff4d4f) for reject. All search bars (300px width) and filter dropdowns (200px width) feature consistent FilterOutlined icons and Flex layout.
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