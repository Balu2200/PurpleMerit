import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-brand-100/70">PurpleMerit</p>
          <h2 className="text-lg font-semibold text-white">User Management System</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-300 capitalize">{user?.role}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
