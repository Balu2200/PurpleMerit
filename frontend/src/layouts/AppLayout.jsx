import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-72 shrink-0 lg:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl md:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-100/80">PurpleMerit</p>
              <h1 className="text-2xl font-semibold">{user?.role === 'admin' ? 'Admin Workspace' : user?.role === 'manager' ? 'Manager Workspace' : 'Profile Workspace'}</h1>
            </div>
            <div className="text-sm text-slate-300">Secure user administration</div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
