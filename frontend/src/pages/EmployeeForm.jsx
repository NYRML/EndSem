import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import api from '../api';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      const payload = {
        ...formData,
        skills: skillsArray,
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await api.post('/employees', payload);
      setSuccess('Employee added successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '2rem' }}>Register New Employee</h1>
      
      <div className="card">
        {error && <div style={{ padding: '1rem', background: '#FEE2E2', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}
        {success && <div style={{ padding: '1rem', background: '#D1FAE5', color: 'var(--secondary)', borderRadius: '8px', marginBottom: '1.5rem' }}>{success}</div>}
        
        <form onSubmit={handleSubmit} className="grid-2">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select name="department" className="form-control" value={formData.department} onChange={handleChange}>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Skills (comma separated)</label>
            <input type="text" name="skills" className="form-control" placeholder="React, Node, Python" value={formData.skills} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Performance Score (0-100)</label>
            <input type="number" name="performanceScore" min="0" max="100" className="form-control" value={formData.performanceScore} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input type="number" name="experience" min="0" className="form-control" value={formData.experience} onChange={handleChange} required />
          </div>
          
          <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={20} />
              {loading ? 'Saving...' : 'Register Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
