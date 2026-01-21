import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import ProtectedRoute from "./utils/protectedRoutes";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student-home" element={<StudentHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
