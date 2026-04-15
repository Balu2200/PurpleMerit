import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import UserFormPage from './pages/UserFormPage.jsx';
import UserDetailsPage from './pages/UserDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleRoute from './components/RoleRoute.jsx';
import AppLayout from './layouts/AppLayout.jsx';

function App() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-300">
        Loading application...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route
          path="users"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <UsersPage />
            </RoleRoute>
          }
        />
        <Route
          path="users/new"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UserFormPage mode="create" />
            </RoleRoute>
          }
        />
        <Route
          path="users/:id"
          element={
            <RoleRoute allowedRoles={["admin", "manager"]}>
              <UserDetailsPage />
            </RoleRoute>
          }
        />
        <Route
          path="users/:id/edit"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UserFormPage mode="edit" />
            </RoleRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
