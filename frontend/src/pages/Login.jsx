import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, setToken } from '../utils/api';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = isRegister
        ? await register(form)
        : await login({ email: form.email, password: form.password });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: 420 }}>
        <h4 className="card-title text-center mb-1">🏠 BuyerPortal</h4>
        <p className="text-center text-muted small mb-4">
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name" required />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Min 6 characters" required minLength={6} />
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <hr />
        <p className="text-center small mb-0">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="btn btn-link btn-sm p-0" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Sign in' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}