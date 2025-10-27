// ⚠️ DEVELOPMENT ONLY - MOCK DATA FOR TESTING
// ⚠️ THIS FILE SHOULD BE REMOVED BEFORE PRODUCTION DEPLOYMENT
// ⚠️ Contains dummy user credentials for local development

export const MOCK_USERS = [
  {
    email: "sripadbal@gmail.com",
    password: "1234",
    token: "mock-auth-token-12345",
    name: "Sri Padbal",
    role: "admin"
  },
  {
    email: "admin@hirenxt.com",
    password: "admin123",
    token: "mock-auth-token-67890",
    name: "Admin User",
    role: "admin"
  },
  {
    email: "user@hirenxt.com",
    password: "user123",
    token: "mock-auth-token-11111",
    name: "Regular User",
    role: "user"
  },
  {
    email: "customer@hirenxt.com",
    password: "customer123",
    token: "mock-auth-token-22222",
    name: "Customer User",
    role: "customer"
  },
  {
    email: "partner@hirenxt.com",
    password: "partner123",
    token: "mock-auth-token-33333",
    name: "Partner User",
    role: "partner"
  }
];

export const findUser = (email, password) => {
  return MOCK_USERS.find(
    user => user.email === email && user.password === password
  );
};
