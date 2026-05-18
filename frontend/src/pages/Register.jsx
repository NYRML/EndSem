import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, BrainCircuit } from 'lucide-react';
import api from '../api';

const Register = ({ setIsAuthenticated }) => {
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
      const response = await api.post('/auth/register', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-card">
        
        {/* Left Side: Hero Image & Branding */}
        <div className="auth-hero" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(99,102,241,0.9)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')" }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800' }}>
              <BrainCircuit size={32} />
              AI HR System
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, margin: '0' }}>
              Join the future of HR.
            </h1>
            <p style={{ fontSize: '1.125rem', opacity: 0.9, marginTop: '1rem' }}>
              Create your account to unlock powerful AI-driven workforce management and analytics.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-section">
          <h2 className="card-title">Create Account</h2>
          <p className="card-subtitle">Sign up to get started.</p>
          
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
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            {error && <div className="error-text">{error}</div>}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? (
                <>Registering...</>
              ) : (
                <>
                  <UserPlus size={20} /> Register
                </>
              )}
            </button>
          </form>
          
          <p style={{ marginTop: '2rem', textAlign: 'center', fontWeight: '500' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
