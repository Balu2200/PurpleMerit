const Pagination = ({ pagination, onChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  const { page, pages } = pagination;

  return (
    <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-300">
      <span>
        Page {page} of {pages}
      </span>
      <div className="flex gap-2">
        <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="rounded-full border border-white/10 px-4 py-2 disabled:opacity-40">Prev</button>
        <button disabled={page >= pages} onClick={() => onChange(page + 1)} className="rounded-full border border-white/10 px-4 py-2 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
};

export default Pagination;
