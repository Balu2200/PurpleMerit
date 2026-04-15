import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import ToastAlert from '../components/ToastAlert.jsx';
import Loader from '../components/Loader.jsx';
import { formatDateTime } from '../utils/format.js';

const ProfilePage = () => {
  const { user, setUser, fetchCurrentUser } = useAuth();
  const [form, setForm] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, password: '' });
    }
  }, [user]);

  if (!user) return <Loader />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.put('/users/me', form);
      setUser(response.data.data);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      setForm((current) => ({ ...current, password: '' }));
      setMessage('Profile updated successfully');
      await fetchCurrentUser();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-100/70">My Profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Manage your account</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" placeholder="Name" />
          <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" placeholder="New password" type="password" />
          <button type="submit" disabled={loading} className="rounded-2xl bg-brand-500 px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? 'Saving...' : 'Update profile'}</button>
        </form>
        <div className="mt-4"><ToastAlert type={message.includes('success') ? 'success' : 'error'} message={message} /></div>
      </section>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold text-white">Audit Information</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-slate-400">Created</dt><dd className="text-white">{formatDateTime(user.createdAt)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-slate-400">Updated</dt><dd className="text-white">{formatDateTime(user.updatedAt)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-slate-400">Created By</dt><dd className="text-white">{user.createdBy?.name || 'System'}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-slate-400">Updated By</dt><dd className="text-white">{user.updatedBy?.name || 'System'}</dd></div>
        </dl>
      </section>
    </div>
  );
};

export default ProfilePage;
