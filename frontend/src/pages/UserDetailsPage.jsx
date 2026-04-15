import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios.js';
import Loader from '../components/Loader.jsx';
import ToastAlert from '../components/ToastAlert.jsx';
import { formatDateTime } from '../utils/format.js';

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <Loader />;

  if (error) return <ToastAlert type="error" message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">User Details</h2>
          <p className="text-sm text-slate-300">Audit data and ownership metadata are shown here.</p>
        </div>
        <Link to={`/users/${user._id}/edit`} className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white">Edit User</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Profile</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Name</dt><dd className="text-white">{user.name}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Email</dt><dd className="text-white">{user.email}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Role</dt><dd className="text-white capitalize">{user.role}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Status</dt><dd className="text-white capitalize">{user.status}</dd></div>
          </dl>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Audit</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Created At</dt><dd className="text-white">{formatDateTime(user.createdAt)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Updated At</dt><dd className="text-white">{formatDateTime(user.updatedAt)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Created By</dt><dd className="text-white">{user.createdBy?.name || 'System'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Updated By</dt><dd className="text-white">{user.updatedBy?.name || 'System'}</dd></div>
          </dl>
        </section>
      </div>
    </div>
  );
};

export default UserDetailsPage;
