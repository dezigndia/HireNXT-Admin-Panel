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
    - **Overview:** Partner-specific metrics (Total Earning, Bench Resources, Jobs Applied, Talents Hired), quick actions (Add Bench Pool, Deploy Resources, Free Consultation), and search functionality for opportunities and requirements.
    - **Ongoing Jobs:** Two-column layout displaying available job opportunities. Left panel shows a scrollable list of job cards with company type, location, open positions, designation, employment type, salary, and skills. Right panel displays comprehensive job details including primary skills, good-to-have skills, project duration, work time, timezone, system provision status, and detailed job descriptions. Includes search functionality and uses dummy data for display with API integration intact.
    - **Talents Hired:** Section for managing hired talent contracts (similar to Customer Dashboard implementation).
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