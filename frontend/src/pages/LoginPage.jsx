import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ToastAlert from '../components/ToastAlert.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'user' ? '/profile' : '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-600 to-cyan-700 p-10 lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">PurpleMerit</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">Secure user management with role-based access.</h1>
          </div>
          <p className="text-sm leading-6 text-white/80">Use the seeded accounts to explore admin, manager, and user flows.</p>
        </div>
        <div className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-100/80">Sign In</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-300">Sign in with email and password.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-400"
            />
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60">
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <p>Admin: admin@example.com / Admin@123</p>
            <p>Manager: manager@example.com / Manager@123</p>
            <p>User: user@example.com / User@123</p>
          </div>
          <p className="mt-4 text-sm text-slate-300">
            New here? <Link to="/signup" className="text-brand-100 underline underline-offset-4">Create an account</Link>
          </p>
          <div className="mt-4">
            <ToastAlert type="error" message={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
