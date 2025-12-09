import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminFrontend from "./components/AdminSideUI/AdminFrontend";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
        
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminFrontend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;