import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4 text-center text-white">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">404</p>
      <h1 className="mt-2 text-4xl font-semibold">Page not found</h1>
      <Link to="/dashboard" className="mt-6 inline-flex rounded-full bg-white/10 px-5 py-3">Go home</Link>
    </div>
  </div>
);

export default NotFoundPage;
