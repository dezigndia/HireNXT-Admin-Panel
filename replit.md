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
- **2025-10-27**: Initial Replit setup completed
  - Installed Node.js 20 and all npm dependencies
  - Configured dev server for port 5000 with 0.0.0.0 host
  - Set up proper .gitignore for Node.js projects
  - Disabled host checking for Replit's iframe proxy environment via .env file
  - Configured workflow "Frontend Server" to run React development server
  - Set up deployment configuration for production (autoscale with serve)
  - Application is running successfully and login page is fully functional

## Features
- User authentication and login
- Dashboard with multiple management sections:
  - User Management
  - Talent Profiles
  - Job Requirements
  - Approval Process
  - Role Permissions
- Partner dashboard for viewing ongoing jobs and hired talents

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

## Deployment
- **Deployment Type**: Autoscale (stateless)
- **Build Command**: Installs dependencies and builds the React app
- **Run Command**: Serves the built app using `serve` on port 5000
- Ready to deploy when needed

## User Preferences
- None specified yet
