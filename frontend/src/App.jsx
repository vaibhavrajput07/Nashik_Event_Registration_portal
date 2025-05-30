import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';

import Login from './Pages/Login';
import Register from './Pages/Signup';

import AdminDashboard from './Pages/AdminDashboard';
import EventRegistration from './Pages/EventRegistrationForm';
import UserDashboard from './Pages/UserDashboard';
import ShowUserList from './Components/ShowUserlist';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/EventRegistration" element={<EventRegistration />} />
        <Route path="/ShowUserList" element={<ShowUserList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
