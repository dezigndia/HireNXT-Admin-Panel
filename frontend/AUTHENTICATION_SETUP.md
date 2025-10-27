# Authentication Setup Guide

## Development vs Production Authentication

This application supports two authentication modes:

### 🔧 Development Mode (Mock Authentication)
- **Use case**: Local development without API dependency
- **How to enable**: Set `REACT_APP_USE_MOCK_AUTH=true` in `.env` file
- **Location**: Mock data stored in `src/mocks/mockUsers.js`
- **Service**: `src/services/authService.js` handles the switching

### 🌐 Production Mode (Real API)
- **Use case**: Production deployment with Azure backend
- **How to enable**: Set `REACT_APP_USE_MOCK_AUTH=false` or remove the variable
- **API Endpoint**: `https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net`

---

## Mock User Credentials

When `REACT_APP_USE_MOCK_AUTH=true`, you can login with these test accounts:

| Email | Password | Role |
|-------|----------|------|
| sripadbal@gmail.com | 1234 | admin |
| admin@hirenxt.com | admin123 | admin |
| user@hirenxt.com | user123 | user |

---

## How to Switch Between Modes

### Enable Mock Authentication (Development)
1. Open `frontend/.env`
2. Set: `REACT_APP_USE_MOCK_AUTH=true`
3. Restart the development server
4. You'll see a warning in the console: "⚠️ DEVELOPMENT MODE: Using mock authentication"

### Enable Real API (Production)
1. Open `frontend/.env`
2. Set: `REACT_APP_USE_MOCK_AUTH=false` (or remove the line entirely)
3. Restart the development server
4. Authentication will use the Azure API endpoint

---

## Before Production Deployment

⚠️ **IMPORTANT**: Before deploying to production:

1. **Disable mock auth**:
   ```env
   REACT_APP_USE_MOCK_AUTH=false
   ```
   Or remove the variable entirely from `.env`

2. **Remove mock files** (optional but recommended):
   - Delete `src/mocks/mockUsers.js`
   - Remove mock authentication code from `src/services/authService.js`

3. **Verify**:
   - Check console for NO warning messages about mock auth
   - Test login with real API credentials
   - Ensure all API endpoints are working correctly

---

## Files Involved

- **`src/services/authService.js`**: Main authentication service that switches between mock/real
- **`src/mocks/mockUsers.js`**: Mock user database (development only)
- **`src/pages/Login/Login.js`**: Login component (uses authService)
- **`frontend/.env`**: Environment configuration

---

## Troubleshooting

**Login fails in development mode**
- Check that email/password match one of the mock users
- Verify `REACT_APP_USE_MOCK_AUTH=true` in `.env`
- Look for console warning about mock authentication

**Login fails in production mode**
- Verify `REACT_APP_USE_MOCK_AUTH=false` or variable is removed
- Check API endpoint is correct in `src/const.js`
- Verify network connectivity to Azure backend
- Check browser console for API errors
