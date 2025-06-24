import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";
import AdminPanel from "./AdminPanel";
import LoginPage from "./LoginPage";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Yükleniyor...</div>;
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="logo-container">
        <img src="/logo.png" alt="Seviye Tespit Logo" style={{maxWidth:"150px"}} />
      </div>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
