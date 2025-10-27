import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ConfigProvider } from "antd";
import PartnerDashboard from "./pages/Partner/PartnerDashboard/PartnerDashboard";
import CustomerDashboard from "./pages/Customer/CustomerDashboard/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Quicksand",
          colorPrimary: "#014C75",
          colorLink: "#01D9A9",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<ProtectedRoute element={<Dashboard />} />} /> */}
          <Route path="/home/*" element={<Dashboard />} />
          <Route path="/partner/*" element={<ProtectedRoute requiredRole="partner"><PartnerDashboard /></ProtectedRoute>} />
          <Route path="/customer/*" element={<ProtectedRoute requiredRole="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
