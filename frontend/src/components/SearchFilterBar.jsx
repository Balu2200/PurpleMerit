const SearchFilterBar = ({ filters, setFilters }) => {
  return (
    <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
      <input
        value={filters.search}
        onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value, page: 1 }))}
        placeholder="Search name or email"
        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
      />
      <select
        value={filters.role}
        onChange={(event) => setFilters((current) => ({ ...current, role: event.target.value, page: 1 }))}
        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
      >
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>
      <select
        value={filters.status}
        onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value, page: 1 }))}
        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select
        value={filters.limit}
        onChange={(event) => setFilters((current) => ({ ...current, limit: Number(event.target.value), page: 1 }))}
        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
      >
        <option value={5}>5 rows</option>
        <option value={10}>10 rows</option>
        <option value={20}>20 rows</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
