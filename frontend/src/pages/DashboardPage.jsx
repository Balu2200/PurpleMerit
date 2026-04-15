import { useAuth } from '../context/AuthContext.jsx';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Role', value: user?.role },
    { label: 'Status', value: user?.status || 'active' },
    { label: 'Email', value: user?.email },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-100/70">Dashboard</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Hello, {user?.name}</h2>
        <p className="mt-2 max-w-2xl text-slate-300">This workspace is ready for secure role-based user administration with audit fields and responsive navigation.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
            <p className="mt-3 break-words text-lg font-semibold text-white">{stat.value || 'N/A'}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
