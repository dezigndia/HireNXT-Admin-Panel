# HireNXT Admin Panel

## Overview
This is a React-based admin panel for the HireNXT platform. The application manages talent profiles, job requirements, user management, and partner dashboards.

## Project Structure
- **Frontend**: React application using Create React App
- **Location**: `/frontend` directory
- **Backend**: External API at `http://65.2.123.21`

## Technology Stack
- React 18.3.1
- Ant Design 5.17.4
- React Router DOM 6.23.1
- Axios 1.9.0
- Styled Components 6.1.11
- React Scripts 5.0.1

## Setup Information
- **Dev Server**: Runs on port 5000 with host 0.0.0.0
- **Configuration**: Configured for Replit's proxy environment with host checking disabled
- **API Connection**: Uses external backend (no local backend in this repository)

## Recent Changes
- **2025-10-27**: Initial Replit setup and mock authentication
  - Installed Node.js 20 and all npm dependencies
  - Configured dev server for port 5000 with 0.0.0.0 host
  - Set up proper .gitignore for Node.js projects
  - Disabled host checking for Replit's iframe proxy environment via .env file
  - Configured workflow "Frontend Server" to run React development server
  - Set up deployment configuration for production (autoscale with serve)
  - **Updated API endpoint to Azure**: `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`
  - **Implemented mock authentication system** for development (bypasses API)
  - Created authentication service layer (`src/services/authService.js`)
  - Added mock user database (`src/mocks/mockUsers.js`) with test credentials
  - Environment-based toggle via `REACT_APP_USE_MOCK_AUTH` flag
  - Application is running successfully with mock auth enabled by default

- **2025-10-27**: Customer Dashboard Implementation
  - **Created complete Customer Dashboard** matching design reference
  - Implemented CustomerDashboard with sidebar navigation (Dashboard, My Jobs, Submitted Profiles, Hired Talents)
  - Built CustomerOverview with metrics cards, hero section, quick actions, and about sections
  - Created MyJobs component for viewing and managing job postings
  - Created SubmittedProfiles component with filtering and status management
  - **Implemented role-based access control** with ProtectedRoute component
  - Added role verification in CustomerDashboard with redirect for unauthorized users
  - Enhanced Login to store userRole, userName in localStorage
  - Fixed menu state highlighting with selectedKeys bound to current location
  - Improved logout handling to clear all auth data (token, role, name)
  - Added customer and partner mock users for testing
  - Files: `src/pages/Customer/*`, `src/components/ProtectedRoute.js`

- **2025-10-27**: Find Talents Feature
  - **Created Find Talents page** for customer dashboard to search and browse talent profiles
  - Implemented comprehensive search by name and role
  - Added Primary Role filter dropdown (Full Stack, Front End, Backend, Django, MERN, DevOps, UI/UX)
  - Added Seniority filter with experience ranges (Junior 0-2, Mid 3-5, Senior 6-10, Lead 10+)
  - Implemented "All Filters" modal with:
    * Secondary Tech multi-select filter (React, NodeJs, Python, Java, Angular, etc.)
    * Location filter (Bangalore, Hyderabad, Kolkata, Delhi, Mumbai, Pune)
    * Mode filter (Remote, Hybrid, In-Office) - infrastructure ready for API integration
  - Created responsive talent profile cards with:
    * Avatar, name, location, experience
    * Role title and hourly rate
    * Top skills as tags
    * "View Details" and "Schedule Interview" action buttons
  - All filters work together with AND logic for precise talent matching
  - Added 8 mock talent profiles with diverse roles and skills
  - Files: `src/pages/Customer/FindTalents/*`

- **2025-10-27**: My Jobs Redesign (Card-Based Layout)
  - **Redesigned My Jobs section** from table to card-based layout matching design reference
  - **Added Metrics Cards** displaying:
    * Job Live (count of ongoing jobs)
    * Profile Received (total submitted profiles across all jobs)
    * Talent Hired (total hired count)
  - **Implemented Filter Tabs** using Ant Design Segmented component:
    * All Jobs
    * Ongoing Job (with dynamic count)
    * Closed Job (with dynamic count)
  - **Created Job Cards** showing:
    * Job ID and title (styled as clickable link)
    * Job type, location tags, and experience requirement
    * Stats section: Submitted Profiles, Interviewing, Rejected (red), Hired (green)
    * Posted date
    * Action menu with Edit Job and Close Job options
  - **Functional Features**:
    * Filter tabs work correctly (All/Ongoing/Closed)
    * Close Job action updates status dynamically
    * Edit Job action (placeholder for future implementation)
    * Metrics recalculate based on current job data
  - **Mock Data**: 4 sample jobs (3 ongoing, 1 closed) with comprehensive fields
  - **Responsive Design**: Mobile-friendly with proper breakpoints
  - Files: `src/pages/Customer/MyJobs/MyJobs.js`, `src/pages/Customer/MyJobs/MyJobs.style.js`

- **2025-10-27**: Job Details Page with Submitted Profiles
  - **Created comprehensive Job Details page** accessible by clicking job titles/IDs from My Jobs
  - **Job Summary Section** displaying:
    * Job ID, full title, contract type, salary, location, open positions
    * Three metric cards: Salary/month, Project Duration, Communication level
    * Primary Skills as tags with expertise levels
  - **Submitted Profiles Table** with columns:
    * Resume (PDF icon for viewing)
    * Name (clickable, styled in blue)
    * Role
    * Top Skills (as tags with levels)
    * Monthly Rate
    * Experience
    * Notice Period
    * Action buttons: Schedule Interview, Download Resume, More menu (Hire/Reject)
  - **Navigation & Routing**:
    * Route: `/customer/my-jobs/:jobId`
    * Back button to return to My Jobs list
    * Job titles in My Jobs are clickable links
  - **Data Management**:
    * useEffect hook syncs profiles with jobId changes
    * Mock data aligned between MyJobs and JobDetails
    * Complete data for all 4 jobs with 1-3 submitted profiles each
  - **Interactive Features**:
    * Schedule Interview button updates profile status
    * Hire/Reject actions from dropdown menu
    * Download Resume functionality
    * Profile status tracking (submitted, interviewing, hired, rejected)
  - **Styling**: Professional card-based layout, color-coded metric icons, responsive table design
  - Files: `src/pages/Customer/JobDetails/*`, `src/pages/Customer/CustomerDashboard/CustomerDashboard.js`

- **2025-10-27**: Post Job Feature (4-Step Form)
  - **Created comprehensive Post Job wizard** with 4-step stepper interface
  - **Step 1 - Skill Required**:
    * Role selection (searchable dropdown)
    * Relevant Experience Range (0-1 Years to 10+ Years)
    * Primary Skills (2 skill slots with expertise levels: Expert, Advanced, Intermediate)
    * Secondary Skills (multi-select tags)
  - **Step 2 - Basic Details**:
    * Budget (with Per/month, Per/hour, Fixed Price options)
    * Reporting Location (with Worldwide checkbox)
    * Month of Engagement (1-24 months)
    * Engagement Type (Full-Time, Part-Time, Freelance, Permanent)
    * Number of Requirements
    * Tentative Start Date (date picker)
    * Expectations (textarea with minimum 60 characters)
    * Communication Level (Excellent, Good, Average, Basic)
  - **Step 3 - Preferences**:
    * Working Time Zone (IST, EST, PST, GMT, CST, JST, AEST)
    * Working Hours per Week (number input)
    * Travel Preference (Remote, Hybrid, On-site, etc.)
    * System Provision (Laptop, Desktop, Both, Not Specified, No)
    * Tools/Methodology (Agile, Scrum, Kanban, Jira, etc.)
  - **Step 4 - Job Responsibilities**:
    * Rich text editor (React Quill) with full formatting toolbar
    * Bold, italic, underline, headers, lists, links, images
    * Cancel and Post Job buttons
  - **Features**:
    * Step-by-step progress indicator at the top
    * Form validation at each step before proceeding
    * "Save & Next" to move forward, "Back" to review previous steps
    * Final "Post Job" submits and redirects to My Jobs
    * State persists across all steps
  - **Navigation**: Added "Job Briefs" menu item to access Post Job page
  - **Styling**: Professional form design matching HireNXT brand with responsive grid layouts
  - Files: `src/pages/Customer/PostJob/*`, `src/pages/Customer/CustomerDashboard/CustomerDashboard.js`

## Features
- User authentication and login with role-based routing
- **Admin Dashboard** with multiple management sections:
  - User Management
  - Talent Profiles
  - Job Requirements
  - Approval Process
  - Role Permissions
- **Partner Dashboard** for viewing ongoing jobs and hired talents
- **Customer Dashboard** for job posting and talent hiring:
  - Overview with metrics (Job Live, Interviews, Applications, Talents Hired)
  - **Find Talents** - search and browse talent profiles with advanced filters
    * Search by name or role
    * Filter by Primary Role, Seniority/Experience
    * Advanced filters: Secondary Tech, Location, Work Mode
    * Responsive grid layout with talent cards
    * View Details and Schedule Interview actions
  - **My Jobs** - view and manage job postings
    * Metrics cards showing Job Live, Profile Received, Talent Hired
    * Filter tabs for All Jobs, Ongoing, and Closed jobs
    * Card-based layout with job details and stats
    * Action menu for Edit Job and Close Job
    * Shows Submitted Profiles, Interviewing, Rejected, and Hired counts per job
    * Clickable job titles navigate to detailed job pages
  - **Job Details** - comprehensive job and candidate management
    * Job summary with metrics (salary, duration, communication)
    * Primary skills display with expertise levels
    * Submitted profiles table with candidate information
    * Action buttons: Schedule Interview, Download Resume, Hire, Reject
    * Real-time profile status updates
    * Back navigation to My Jobs list
  - **Post Job (Job Briefs)** - 4-step wizard for posting new jobs
    * Step 1: Skill Required - role, experience, primary/secondary skills
    * Step 2: Basic Details - budget, location, engagement, expectations
    * Step 3: Preferences - working hours, timezone, travel, tools
    * Step 4: Job Responsibilities - rich text editor for detailed description
    * Progress stepper, form validation, state management
    * Navigates to My Jobs on successful submission
  - Submitted Profiles - review talent profiles for jobs
  - Hero section with talent search
  - Quick actions for posting jobs and consultations

## API Endpoints
The application connects to the following API endpoints (defined in `frontend/src/const.js`):
- Login
- User Management (add/get)
- Talent Profiles (add/get)
- Job Requirements (add/get)

## Development Notes
- The app may show a React hooks warning in the console related to styled-components v6, but this doesn't affect functionality
- All dependencies use React 18.3.1 consistently
- The frontend communicates with an external backend API (not included in this repository)

## Authentication Modes

### Development Mode (Current: ENABLED ✅)
- Mock authentication is currently **ENABLED** via `REACT_APP_USE_MOCK_AUTH=true`
- Login works with dummy credentials without hitting the real API
- Test credentials:
  - **Admin**: `sripadbal@gmail.com` / `1234` or `admin@hirenxt.com` / `admin123`
  - **User**: `user@hirenxt.com` / `user123`
  - **Customer**: `customer@hirenxt.com` / `customer123`
  - **Partner**: `partner@hirenxt.com` / `partner123`
- Console displays orange warning: "⚠️ DEVELOPMENT MODE: Using mock authentication"
- Files: `src/services/authService.js`, `src/mocks/mockUsers.js`

### Production Mode (To enable later)
- Set `REACT_APP_USE_MOCK_AUTH=false` in `.env` to use real Azure API
- All authentication requests will go to Azure backend
- Before production deployment, remove mock files and disable mock mode
- See `frontend/AUTHENTICATION_SETUP.md` for detailed instructions

## Deployment
- **Deployment Type**: Autoscale (stateless)
- **Build Command**: Installs dependencies and builds the React app
- **Run Command**: Serves the built app using `serve` on port 5000
- Ready to deploy when needed

## User Preferences
- None specified yet
