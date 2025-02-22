import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./pages/Authentication/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<NoPage />} /> */}
        <Route path="/" element={<Login />} />
        <Route
          path="/home/*"
          element={<ProtectedRoute element={<Dashboard />} isLogout={false} />}
        />
        <Route
          path="/logout"
          element={<ProtectedRoute element={<Dashboard />} isLogout={true} />}
        />
        <Route path="/home/*" element={<Dashboard />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
