import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.js';
import ToastAlert from '../components/ToastAlert.jsx';

const defaultForm = { name: '', email: '', password: '', role: 'user', status: 'active' };

const UserFormPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(mode === 'edit');

  useEffect(() => {
    const loadUser = async () => {
      if (mode !== 'edit') return;
      try {
        const response = await api.get(`/users/${id}`);
        const { name, email, role, status } = response.data.data;
        setForm({ name, email, role, status, password: '' });
      } catch (requestError) {
        setMessage(requestError.response?.data?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'create') {
        await api.post('/users', form);
        navigate('/users');
      } else {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await api.put(`/users/${id}`, payload);
        navigate(`/users/${id}`);
      }
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white">{mode === 'create' ? 'Create User' : 'Edit User'}</h2>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Name" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" />
        <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email" type="email" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" />
        <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="Password" type="password" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" />
        <select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="rounded-2xl bg-brand-500 px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? 'Saving...' : 'Save user'}</button>
        </div>
      </form>
      <div className="mt-4"><ToastAlert type="error" message={message} /></div>
    </div>
  );
};

export default UserFormPage;
