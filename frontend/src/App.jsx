import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit2, Search, Briefcase, Clock, 
  CheckCircle, XCircle, TrendingUp, Calendar 
} from 'lucide-react';
import './App.css';

const API_URL = 'http://localhost:8080/api/applications';

function App() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    jobType: 'Full-time',
    status: 'Applied',
    applicationUrl: '',
    appliedDate: new Date().toISOString().split('T')[0],
    followUpDate: '',
    notes: '',
    salary: ''
  });

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.position) {
      alert('Company Name and Position are required!');
      return;
    }
    
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        fetchApplications();
        fetchStats();
        resetForm();
        alert(editingId ? 'Application updated!' : 'Application added!');
      }
    } catch (error) {
      console.error('Error saving application:', error);
      alert('Failed to save application!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { 
          method: 'DELETE' 
        });
        
        if (response.ok) {
          fetchApplications();
          fetchStats();
          alert('Application deleted!');
        }
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application!');
      }
    }
  };

  const handleEdit = (app) => {
    setFormData({
      companyName: app.companyName,
      position: app.position,
      jobType: app.jobType,
      status: app.status,
      applicationUrl: app.applicationUrl || '',
      appliedDate: app.appliedDate,
      followUpDate: app.followUpDate || '',
      notes: app.notes || '',
      salary: app.salary || ''
    });
    setEditingId(app.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      position: '',
      jobType: 'Full-time',
      status: 'Applied',
      applicationUrl: '',
      appliedDate: new Date().toISOString().split('T')[0],
      followUpDate: '',
      notes: '',
      salary: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'status-applied',
      'Interview': 'status-interview',
      'Offer': 'status-offer',
      'Rejected': 'status-rejected'
    };
    return colors[status] || 'status-default';
  };

  const StatCard = ({ icon: Icon, label, count, colorClass }) => (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-content">
        <div className="stat-info">
          <p className="stat-label">{label}</p>
          <p className="stat-count">{count || 0}</p>
        </div>
        <Icon className="stat-icon" />
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header-card">
          <div className="header-content">
            <h1 className="app-title">🎯 Job Application Tracker</h1>
            <p className="app-subtitle">Track and manage all your job applications in one place</p>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard 
            icon={Briefcase} 
            label="Total Applications" 
            count={stats.totalApplications} 
            colorClass="stat-purple" 
          />
          <StatCard 
            icon={Clock} 
            label="Applied" 
            count={stats.appliedCount} 
            colorClass="stat-blue" 
          />
          <StatCard 
            icon={TrendingUp} 
            label="In Interview" 
            count={stats.interviewCount} 
            colorClass="stat-yellow" 
          />
          <StatCard 
            icon={CheckCircle} 
            label="Offers Received" 
            count={stats.offerCount} 
            colorClass="stat-green" 
          />
          <StatCard 
            icon={XCircle} 
            label="Rejected" 
            count={stats.rejectedCount} 
            colorClass="stat-red" 
          />
        </div>

        <div className="search-card">
          <div className="search-content">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="add-button"
            >
              <Plus size={20} />
              Add Application
            </button>
          </div>
        </div>

        {showForm && (
          <div className="form-card">
            <h2 className="form-title">
              {editingId ? '✏️ Edit Application' : '➕ Add New Application'}
            </h2>
            
            <div className="form-grid">
              <input
                type="text"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="form-input"
              />
              
              <input
                type="text"
                placeholder="Position *"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="form-input"
              />
              
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                className="form-input"
              >
                <option>Full-time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Part-time</option>
              </select>
              
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="form-input"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              
              <input
                type="url"
                placeholder="Application URL (optional)"
                value={formData.applicationUrl}
                onChange={(e) => setFormData({...formData, applicationUrl: e.target.value})}
                className="form-input"
              />
              
              <input
                type="number"
                placeholder="Expected Salary (LPA)"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="form-input"
              />
              
              <div className="form-input-wrapper">
                <label className="input-label">Applied Date</label>
                <input
                  type="date"
                  value={formData.appliedDate}
                  onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <div className="form-input-wrapper">
                <label className="input-label">Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <textarea
                placeholder="Notes (optional)"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="form-textarea"
                rows="3"
              />
            </div>
            
            <div className="form-buttons">
              <button onClick={handleSubmit} className="btn-primary">
                {editingId ? 'Update Application' : 'Save Application'}
              </button>
              <button onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="table-card">
          {loading ? (
            <div className="loading">Loading applications...</div>
          ) : (
            <div className="table-wrapper">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map(app => (
                    <tr key={app.id}>
                      <td>
                        <div className="company-cell">
                          <strong>{app.companyName}</strong>
                          {app.applicationUrl && (
                            <a 
                              href={app.applicationUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="app-link"
                            >
                              View Posting
                            </a>
                          )}
                        </div>
                      </td>
                      <td>{app.position}</td>
                      <td>
                        <span className="job-type-badge">{app.jobType}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <div className="date-cell">
                          <Calendar size={14} />
                          {app.appliedDate}
                        </div>
                      </td>
                      <td>
                        {app.salary ? `₹${app.salary}L` : '-'}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleEdit(app)} 
                            className="btn-icon btn-edit"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(app.id)} 
                            className="btn-icon btn-delete"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredApplications.length === 0 && (
                <div className="empty-state">
                  <Briefcase size={48} />
                  <p>No applications found</p>
                  <p className="empty-subtitle">
                    {searchTerm || filterStatus !== 'All' 
                      ? 'Try adjusting your search or filter' 
                      : 'Add your first job application to get started!'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="footer">
          <p>Built with ❤️ by Viraj | Spring Boot + React + MongoDB</p>
        </div>
      </div>
    </div>
  );
}

export default App;