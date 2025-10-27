// Authentication Service - handles both mock and real API authentication

import { API_CONST } from "../const";
import { findUser } from "../mocks/mockUsers";

// Read the mock auth flag from environment variable
// Default to false (use real API) unless explicitly enabled
const USE_MOCK_AUTH = process.env.REACT_APP_USE_MOCK_AUTH === 'true';

// Log warning if mock auth is enabled
if (USE_MOCK_AUTH) {
  console.warn(
    '%c⚠️ DEVELOPMENT MODE: Using mock authentication (bypass API)',
    'background: #ff9800; color: white; font-size: 14px; padding: 4px 8px; border-radius: 3px;'
  );
  console.warn('To use real API, set REACT_APP_USE_MOCK_AUTH=false in .env');
}

/**
 * Mock authentication - bypasses API calls and uses local dummy data
 */
const mockLogin = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = findUser(email, password);
  
  if (user) {
    return {
      ok: true,
      json: async () => ({
        token: user.token,
        message: "Login successful (MOCK)",
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        }
      })
    };
  } else {
    return {
      ok: false,
      json: async () => ({
        message: "Invalid credentials (MOCK)"
      })
    };
  }
};

/**
 * Real API authentication - makes actual API calls
 */
const realLogin = async (email, password) => {
  return fetch(API_CONST.LOGIN, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

/**
 * Login function - automatically uses mock or real API based on environment
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response from authentication
 */
export const login = async (email, password) => {
  if (USE_MOCK_AUTH) {
    console.log('🔧 Using mock authentication');
    return mockLogin(email, password);
  } else {
    console.log('🌐 Using real API authentication');
    return realLogin(email, password);
  }
};

export default {
  login
};
