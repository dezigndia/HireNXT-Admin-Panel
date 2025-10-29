# HireNXT Admin Panel

## Overview
The HireNXT Admin Panel is a React-based application designed to manage the HireNXT platform. Its core purpose is to streamline talent profile management, job requirement handling, user administration, and provide dedicated dashboards for partners and customers. The project aims to centralize critical operations, enhance user experience for talent acquisition, and support efficient resource allocation within the HireNXT ecosystem.

## User Preferences
None specified yet

## System Architecture
The application is a React-based single-page application (SPA) built with Create React App. It utilizes Ant Design for its UI components, ensuring a consistent and professional look and feel. Styling is managed using Styled Components. React Router DOM handles client-side routing, enabling navigation between different sections like Customer Dashboard, Job Details, and Post Job wizard.

**UI/UX Decisions:**
- **Design System:** Ant Design is the primary UI library, providing a modern and consistent aesthetic.
- **Color Schemes:** Professional layouts with clean white backgrounds, accented by teal/green (`#00d9a9`, `#01c49b`) for active states, highlights, and interactive elements, and dark blue (`#014c75`) for primary text and titles. Background color `#f8f9fd` provides subtle contrast.
- **Responsiveness:** Designed to be mobile-friendly with proper breakpoints and responsive layouts for tables and forms.
- **Interaction Patterns:**
    - Card-based layouts for job listings and talent profiles.
    - Tabbed navigation for filtering content (e.g., Active/Inactive Talents).
    - Multi-step forms with progress indicators for complex processes like 'Post Job'.
    - Interactive tables with filtering, sorting, and action menus.

**Technical Implementations & Feature Specifications:**
- **Authentication:** Role-based access control with a `ProtectedRoute` component ensures only authorized users access specific routes. Mock authentication is available for development, allowing testing with dummy credentials for Admin, User, Customer, and Partner roles.
- **Customer Dashboard:** A central hub for customers featuring:
    - **Overview:** Metrics cards (Job Live, Profile Received, Talent Hired) and quick actions.
    - **Find Talents:** Advanced search and filtering capabilities for talent profiles (by role, seniority, skills, location, work mode). Displays talent profiles as responsive cards.
    - **My Jobs:** Card-based display of job postings with status filters (All, Ongoing, Closed) and job-specific metrics. Clickable job titles lead to detailed views.
    - **Job Details:** Comprehensive view of a specific job, including a summary, primary skills, and a table of submitted profiles. Allows for candidate management (schedule interview, hire, reject).
    - **Post Job:** A 4-step wizard for creating new job postings, including skill requirements, basic details, preferences, and job responsibilities (with a rich text editor). Features step-by-step validation and state persistence.
    - **Hired Talents:** Manages active and inactive talent contracts in a tabbed interface. Displays detailed contract information, calculated end dates, color-coded 'Days Left', and actions like 'Renew Contract', 'Raise Issue', and 'Initiate Termination'.
- **Partner Dashboard:** A comprehensive hub for partners featuring:
    - **Overview:** Partner-specific metrics (Total Earning, Bench Pool, Jobs Applied, Talents Hired), quick actions with "Add Bench Pool" button (redirects to /partner/bench-pool), Deploy Resources, and Free Consultation. Professional search functionality for opportunities and requirements.
    - **Ongoing Jobs:** Two-column layout displaying available job opportunities with streamlined search and filtering:
        - **Search & Filters:** Clean, professional search bar with search icon prefix, plus 2 primary filters (Location, Primary Skill) visible inline, with 5 additional filters (Company Type, Industry, Experience, Contract Type, Working Mode) accessible through "More Filters" drawer. Active filter count display and "Clear All" functionality.
        - **Left Panel (Job List):** Scrollable list of job cards showing company type, location, open positions, designation with experience, employment type tags, and highlighted salary (teal text). Selected job highlighted with teal border and background.
        - **Right Panel (Job Details):** Top section with "Submit Profiles" button inline with properly aligned job metadata using Space component (Job ID, interested candidates, location, open positions all in one row with consistent spacing). Displays designation, highlighted salary (teal text), project duration, communication level, primary skills, good-to-have skills, start date, system provision status, work time, timezone, and complete job description as formatted text string (matching data structure from Post Job feature).
        - **API Integration:** Uses `API_CONST.GET_JOB_REQUIREMENTS` endpoint with POST method, falls back to dummy data (5 sample jobs) when API is unavailable.
    - **Submit Profiles:** Dedicated page for submitting candidate profiles to specific job opportunities:
        - **Job Summary Card:** Displays job ID, title, type, highlighted salary, location, open positions, salary per month metric, project duration, communication level, and primary skills.
        - **Action Buttons:** Two prominent buttons above the profiles table - "Add from Bench Pool" (to select from existing resources) and "Add New Resource" (to add new candidates).
        - **Add from Bench Pool Modal:** Professional modal with centered title, optimized search bar (14px font, improved placeholder "Search by name, role, or skill"), compact table with reduced font size (13px) and proper column widths for better content fit. Top Skills column displays skill data with proper tags showing skill name and proficiency level. Selected resources display with improved chip design (light teal background #e6fff9, teal border #00d9a9, proper padding). Primary action button (dark blue #014c75) for adding resources. Matches Admin module's design aesthetics.
        - **Add New Resource Modal:** Comprehensive form modal identical to Admin's "Add Bench Resource" functionality, excluding Partner Organization field (auto-filled from logged-in partner). Includes file uploads for resume, Aadhar, PAN, and degree proof, with proper validation and form styling.
        - **Profiles Table:** Comprehensive table showing resume PDF icon, candidate name, role, top skills with proficiency levels, highlighted monthly rate, experience, notice period, and download resume action.
        - **Navigation:** Back button to return to Ongoing Jobs, maintains design consistency with Customer Dashboard's Job Details page.
    - **Bench Pool:** Comprehensive resource management page for partners:
        - **Top Metrics:** Three metric cards displaying Active Resources, Jobs Applied (total across all resources), and Talents Hired (total past hires). Each card features an icon with colored background, large metric number, and descriptive label with hover effects.
        - **Tabs:** Active and Inactive tabs for filtering resources by status, showing resource count in each tab with teal accent (#00d9a9) for active tab.
        - **Search & Filters:** Professional large-sized search bar (320px width) with styled search icon prefix and filter dropdown for Location (220px width with FilterOutlined icon). Both components have improved alignment and consistent size="large" for better UX. Search filters resources by name or role in real-time.
        - **Bulk Actions:** "Change Status" button appears when resources are selected, allowing bulk status changes between Active and Inactive. Dropdown menu with action options.
        - **Data Table:** Comprehensive table with checkbox selection for bulk actions and the following columns (optimized order):
          - **Resume:** Centered PDF icon (90px width) for resume download/view
          - **Name:** Resource full name in bold (160px)
          - **Role:** Job designation/position (180px)
          - **Top Skill:** Skill with proficiency level displayed as blue tag (160px)
          - **Monthly Rate:** Highlighted in teal (#00d9a9) for visibility (130px)
          - **Experience:** Years and months of work experience (140px)
          - **Location:** City/region (120px)
          - **Jobs Applied:** Count displayed as centered cyan tag (120px)
          - **Past Hired:** Count displayed as centered green tag (110px)
          - **Action:** Centered dropdown menu (80px) with View Details, Download Resume, Mark Active/Inactive, Edit, and Delete options
        - **Add New Resource:** Button at top right to add new bench pool resources, opens same modal as Submit Profiles implementation
        - **Pagination:** Table pagination with page size options and total count display
        - **API Integration:** Ready for backend integration with dummy data (5 sample resources) for development and testing
    - **Talents Hired:** Partner-specific talent contract management with Active/Inactive tabs:
        - **Table Columns (Partner perspective):** Name, Role, Experience, Monthly Rate, Total Billed, Onboarding Date, Contract Duration, Last Working Day, and color-coded Days Left (green >90 days, orange ≤90 days, red ≤30 days, gray for completed)
        - **Column Details:**
          - Email column removed (not required in partner view)
          - Role column added - displays talent's job designation
          - Experience column added - shows years of experience
          - Total Billed column added - displays total revenue generated from this talent (formatted with rupee symbol and thousand separators, bold dark blue text)
        - **Actions:** View Details, Raise Issue, Initiate Termination (Renew Contract removed - only customers can renew contracts)
        - **Design:** Consistent with brand aesthetics, professional segmented tabs with teal accent, clean table layout with hover effects
- **Admin Dashboard:** Comprehensive management sections including User Management, Talent Profiles, Job Requirements, Approval Process, and Role Permissions.

**System Design Choices:**
- **Frontend-only Repository:** The current repository focuses solely on the React frontend.
- **External Backend:** The application is designed to communicate with an external RESTful API.
- **Environment Configuration:** Uses `.env` files for environment-specific variables, such as API endpoints and mock authentication toggles.

## External Dependencies
- **Backend API:** An external RESTful API hosted on Azure. The primary endpoint is `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`.
- **Axios:** Used for making HTTP requests to the backend API.
- **Ant Design (antd):** A UI library providing a rich set of components for building the user interface.
- **React Router DOM:** For declarative routing in React applications.
- **Styled Components:** For writing component-scoped CSS.
- **React Quill:** A rich text editor used in the 'Post Job' feature for job responsibilities.
- **serve:** A static file server used for deploying the built React application.