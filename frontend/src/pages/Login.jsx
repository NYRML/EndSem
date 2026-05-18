import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, BrainCircuit } from 'lucide-react';
import api from '../api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-card">
        
        {/* Left Side: Hero Image & Branding */}
        <div className="auth-hero">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800' }}>
              <BrainCircuit size={32} />
              AI HR System
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem' }}>
              Supercharge your <br /> workforce with AI.
            </h1>
            <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
              Predict promotions, get training insights, and manage employees efficiently using state-of-the-art AI.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-section">
          <h2 className="card-title">Welcome Back</h2>
          <p className="card-subtitle">Please enter your details to sign in.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="error-text">{error}</div>}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? (
                <>Logging in...</>
              ) : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </button>
          </form>
          
          <p style={{ marginTop: '2rem', textAlign: 'center', fontWeight: '500' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
