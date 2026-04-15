import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ToastAlert from '../components/ToastAlert.jsx';

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user', inviteCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if ((form.role === 'admin' || form.role === 'manager') && !form.inviteCode.trim()) {
      setError('Invite code is required for elevated roles');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        inviteCode: form.inviteCode.trim() || undefined,
      });
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-cyan-700 to-brand-600 p-10 lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Create account</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">Join the secure user management workspace.</h1>
          </div>
          <p className="text-sm leading-6 text-white/80">New accounts are created as standard users and can update their own profile after signup.</p>
        </div>
        <div className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-100/80">Sign Up</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-slate-300">Sign up with your name, email, and password.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-400"
            />
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
            <input
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-400"
            />
            <select
              value={form.role}
              onChange={(event) => setForm((current) => ({ ...current, role: event.target.value, inviteCode: event.target.value === 'user' ? '' : current.inviteCode }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            {(form.role === 'admin' || form.role === 'manager') && (
              <input
                type="text"
                placeholder="Invite code"
                value={form.inviteCode}
                onChange={(event) => setForm((current) => ({ ...current, inviteCode: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-400"
              />
            )}
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <div className="mt-6 text-sm text-slate-300">
            Already have an account? <Link to="/login" className="text-brand-100 underline underline-offset-4">Sign in</Link>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Elevated roles require a server-side invite code configured in the backend environment.
          </p>
          <div className="mt-4">
            <ToastAlert type="error" message={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
