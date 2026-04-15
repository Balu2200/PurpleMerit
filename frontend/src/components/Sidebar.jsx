import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const linkClass = ({ isActive }) =>
  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
    isActive ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-slate-200 hover:bg-white/10'
  }`;

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl">
      <div className="mb-4 rounded-2xl bg-slate-900/70 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Signed in as</p>
        <p className="mt-1 font-semibold text-white">{user?.name}</p>
        <p className="text-sm capitalize text-slate-300">{user?.role}</p>
      </div>
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/profile" className={linkClass}>My Profile</NavLink>
        {(user?.role === 'admin' || user?.role === 'manager') && <NavLink to="/users" className={linkClass}>Users</NavLink>}
        {user?.role === 'admin' && <NavLink to="/users/new" className={linkClass}>Create User</NavLink>}
      </nav>
    </div>
  );
};

export default Sidebar;
