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

## Features
- User authentication and login with role-based routing
- **Admin Dashboard** with multiple management sections:
  - User Management
  - Talent Profiles
  - Job Requirements
  - Approval Process
  - Role Permissions
- **Partner Dashboard** for viewing ongoing jobs and hired talents
- **Customer Dashboard** (New!) for job posting and talent hiring:
  - Overview with metrics (Job Live, Interviews, Applications, Talents Hired)
  - My Jobs - view and manage job postings
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
