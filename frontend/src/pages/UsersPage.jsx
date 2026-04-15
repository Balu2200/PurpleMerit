import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useUsers } from '../hooks/useUsers.js';
import SearchFilterBar from '../components/SearchFilterBar.jsx';
import UserTable from '../components/UserTable.jsx';
import Pagination from '../components/Pagination.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Loader from '../components/Loader.jsx';
import ToastAlert from '../components/ToastAlert.jsx';

const UsersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState({ search: '', role: '', status: '', page: 1, limit: 10 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [notice, setNotice] = useState('');

  const query = useMemo(() => ({ ...filters }), [filters]);
  const { data, loading, error, setData } = useUsers(query);

  const handleDelete = (targetUser) => {
    setSelectedUser(targetUser);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await api.delete(`/users/${selectedUser._id}`);
      setData((current) => ({
        ...current,
        users: current.users.filter((entry) => entry._id !== selectedUser._id),
      }));
      setNotice('User deactivated successfully');
    } catch (requestError) {
      setNotice(requestError.response?.data?.message || 'Failed to deactivate user');
    } finally {
      setSelectedUser(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">Users</h2>
          <p className="text-sm text-slate-300">Search, filter, and manage users from one place.</p>
        </div>
        {user?.role === 'admin' && (
          <button onClick={() => navigate('/users/new')} className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white">Create User</button>
        )}
      </div>

      <SearchFilterBar filters={filters} setFilters={setFilters} />
      <ToastAlert type="error" message={error} />
      <ToastAlert type={notice.includes('success') ? 'success' : 'info'} message={notice} />
      <UserTable users={data.users} onDelete={user?.role === 'admin' ? handleDelete : null} canEdit={user?.role === 'admin'} />
      <Pagination pagination={data.pagination} onChange={(page) => setFilters((current) => ({ ...current, page }))} />
      <ConfirmDialog
        open={Boolean(selectedUser)}
        title="Deactivate user"
        message={`Deactivate ${selectedUser?.name}? This will mark the account inactive.`}
        confirmLabel="Deactivate"
        onConfirm={confirmDelete}
        onCancel={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UsersPage;
