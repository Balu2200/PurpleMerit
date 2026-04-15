const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmLabel = 'Confirm' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-glow">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">Cancel</button>
          <button type="button" onClick={onConfirm} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-400">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
