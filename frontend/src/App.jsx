import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./pages/auth/AuthPage";
import CourseCatalog from "./pages/courses/CourseCatalog";
import CourseDetail from "./pages/courses/CourseDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Layout from "./components/layout/Layout";
import MyEnrollments from "./pages/enrollments/MyEnrollments";

function ProtectedRoute({ children, adminOnly }) {
  const { token, user } = useAuth();
  if (!token) return <Navigate to="/auth" />;
  if (adminOnly && user?.role !== "ADMIN") return <Navigate to="/courses" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="enrollments" element={<MyEnrollments />} />
        <Route index element={<Navigate to="/courses" />} />
        <Route path="courses" element={<CourseCatalog />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
