import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      let url = '/employees';
      if (departmentFilter || searchTerm) {
        url = `/employees/search?department=${departmentFilter}&name=${searchTerm}`;
      }
      const response = await api.get(url);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [departmentFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees();
  };

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Employee Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your workforce efficiently.</p>
        </div>
        <Link to="/add-employee" className="btn btn-primary">
          <Plus size={20} />
          Add Employee
        </Link>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name..."
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-secondary">Search</button>
        </form>
        
        <div style={{ width: '250px', position: 'relative' }}>
          <Filter size={20} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: 'var(--text-muted)' }} />
          <select
            className="form-control"
            style={{ paddingLeft: '2.5rem', appearance: 'none' }}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading employees...</div>
        ) : employees.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No employees found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Skills</th>
                <th>Performance</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>
                    <div style={{ fontWeight: '500' }}>{emp.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                  </td>
                  <td>
                    <span className="badge">{emp.department}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {emp.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', background: '#F3F4F6', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {skill}
                        </span>
                      ))}
                      {emp.skills.length > 3 && (
                        <span style={{ fontSize: '0.75rem', background: '#F3F4F6', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          +{emp.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '100%', background: '#E5E7EB', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${emp.performanceScore}%`, background: emp.performanceScore >= 80 ? 'var(--secondary)' : emp.performanceScore >= 50 ? '#F59E0B' : 'var(--danger)', height: '100%' }}></div>
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{emp.performanceScore}</span>
                    </div>
                  </td>
                  <td>{emp.experience} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
