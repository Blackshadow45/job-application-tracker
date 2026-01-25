import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import './App.css';

// Components
import Header from './components/Header';
import StatCard from './components/StatCard';
import SearchBar from './components/SearchBar';
import ApplicationForm from './components/ApplicationForm';
import ApplicationTable from './components/ApplicationTable';
import EmptyState from './components/EmptyState';

// Utils
import {
  fetchAllApplications,
  fetchDashboardStats,
  createApplication,
  updateApplication,
  deleteApplication
} from './utils/api';

function App() {
  // State
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

  // Fetch data - useCallback to prevent re-creation
  const loadApplications = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllApplications();
    setApplications(data);
    setLoading(false);
  }, []);

  const loadStats = useCallback(async () => {
    const data = await fetchDashboardStats();
    setStats(data);
  }, []);

  // Initial load only
  useEffect(() => {
    loadApplications();
    loadStats();
  }, []); // Empty dependency - runs once only

  // Filtered applications - useMemo to prevent recalculation
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [applications, searchTerm, filterStatus]);

  // Handlers
  const handleSubmit = async () => {
    if (!formData.companyName || !formData.position) {
      alert('Company Name and Position are required!');
      return;
    }
    
    const success = editingId 
      ? await updateApplication(editingId, formData)
      : await createApplication(formData);
    
    if (success) {
      await loadApplications();
      await loadStats();
      resetForm();
      alert(editingId ? 'Application updated!' : 'Application added!');
    } else {
      alert('Failed to save application!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const success = await deleteApplication(id);
      if (success) {
        await loadApplications();
        await loadStats();
        alert('Application deleted!');
      } else {
        alert('Failed to delete application!');
      }
    }
  };

  const handleEdit = useCallback((app) => {
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
  }, []);

  const resetForm = useCallback(() => {
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
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Header />

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

        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onAddClick={() => setShowForm(!showForm)}
        />

        {showForm && (
          <ApplicationForm 
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        )}

        <div className="table-card">
          {loading ? (
            <div className="loading">Loading applications...</div>
          ) : filteredApplications.length === 0 ? (
            <EmptyState searchTerm={searchTerm} filterStatus={filterStatus} />
          ) : (
            <ApplicationTable 
              applications={filteredApplications}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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