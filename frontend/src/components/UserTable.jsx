import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/format.js';

const badgeStyles = {
  active: 'bg-emerald-500/15 text-emerald-200',
  inactive: 'bg-rose-500/15 text-rose-200',
};

const UserTable = ({ users, onDelete, canEdit }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="bg-white/5 text-slate-300">
          <tr>
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4">Email</th>
            <th className="px-4 py-4">Role</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Created</th>
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-100">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-white/5">
              <td className="px-4 py-4 font-medium">{user.name}</td>
              <td className="px-4 py-4 text-slate-300">{user.email}</td>
              <td className="px-4 py-4 capitalize">{user.role}</td>
              <td className="px-4 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[user.status] || badgeStyles.active}`}>{user.status}</span>
              </td>
              <td className="px-4 py-4 text-slate-300">{formatDateTime(user.createdAt)}</td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <Link to={`/users/${user._id}`} className="rounded-full border border-white/10 px-3 py-1 text-xs hover:bg-white/10">View</Link>
                  {canEdit && <Link to={`/users/${user._id}/edit`} className="rounded-full border border-brand-500/30 px-3 py-1 text-xs text-brand-100 hover:bg-brand-500/10">Edit</Link>}
                  {onDelete && (
                    <button type="button" onClick={() => onDelete(user)} className="rounded-full border border-rose-400/30 px-3 py-1 text-xs text-rose-200 hover:bg-rose-500/10">
                      Deactivate
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
