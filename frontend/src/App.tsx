import { Navigate, Route, Routes } from "react-router-dom";

import ApplyPage from "./pages/ApplyPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/apply" />}
      />

      <Route
        path="/apply"
        element={<ApplyPage />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
    </Routes>
  );
}

export default App;