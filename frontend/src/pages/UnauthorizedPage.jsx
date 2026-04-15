import { Link } from 'react-router-dom';

const UnauthorizedPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4 text-center">
    <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow">
      <h1 className="text-3xl font-semibold text-white">Access denied</h1>
      <p className="mt-3 text-slate-300">You do not have permission to view this resource.</p>
      <Link to="/dashboard" className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 font-semibold text-white">Back to dashboard</Link>
    </div>
  </div>
);

export default UnauthorizedPage;
