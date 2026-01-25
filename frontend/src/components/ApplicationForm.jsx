import React, { memo } from 'react';
import { JOB_TYPES, STATUS_OPTIONS } from '../constants/constants';

const ApplicationForm = memo(({ 
  formData, 
  setFormData, 
  editingId, 
  onSubmit, 
  onCancel 
}) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="form-card">
      <h2 className="form-title">
        {editingId ? '✏️ Edit Application' : '➕ Add New Application'}
      </h2>
      
      <div className="form-grid">
        <input
          type="text"
          placeholder="Company Name *"
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          className="form-input"
        />
        
        <input
          type="text"
          placeholder="Position *"
          value={formData.position}
          onChange={(e) => handleInputChange('position', e.target.value)}
          className="form-input"
        />
        
        <select
          value={formData.jobType}
          onChange={(e) => handleInputChange('jobType', e.target.value)}
          className="form-input"
        >
          {JOB_TYPES.map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>
        
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="form-input"
        >
          {STATUS_OPTIONS.map(status => (
            <option key={status}>{status}</option>
          ))}
        </select>
        
        <input
          type="url"
          placeholder="Application URL (optional)"
          value={formData.applicationUrl}
          onChange={(e) => handleInputChange('applicationUrl', e.target.value)}
          className="form-input"
        />
        
        <input
          type="number"
          placeholder="Expected Salary (LPA)"
          value={formData.salary}
          onChange={(e) => handleInputChange('salary', e.target.value)}
          className="form-input"
        />
        
        <div className="form-input-wrapper">
          <label className="input-label">Applied Date</label>
          <input
            type="date"
            value={formData.appliedDate}
            onChange={(e) => handleInputChange('appliedDate', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-input-wrapper">
          <label className="input-label">Follow-up Date</label>
          <input
            type="date"
            value={formData.followUpDate}
            onChange={(e) => handleInputChange('followUpDate', e.target.value)}
            className="form-input"
          />
        </div>
        
        <textarea
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="form-textarea"
          rows="3"
        />
      </div>
      
      <div className="form-buttons">
        <button onClick={onSubmit} className="btn-primary">
          {editingId ? 'Update Application' : 'Save Application'}
        </button>
        <button onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
});

ApplicationForm.displayName = 'ApplicationForm';

export default ApplicationForm;