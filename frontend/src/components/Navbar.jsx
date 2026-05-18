import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Users, UserPlus, Sparkles } from 'lucide-react';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Sparkles size={24} />
        AI HR System
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <Users size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Dashboard
        </Link>
        <Link to="/add-employee" className={`nav-link ${isActive('/add-employee')}`}>
          <UserPlus size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Add Employee
        </Link>
        <Link to="/ai-recommendations" className={`nav-link ${isActive('/ai-recommendations')}`}>
          <Sparkles size={18} style={{ display: 'inline', marginRight: '4px' }} />
          AI Insights
        </Link>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
