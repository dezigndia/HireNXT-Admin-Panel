import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ConfigProvider } from "antd";

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
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
