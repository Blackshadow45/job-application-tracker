import React, { memo } from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { STATUS_COLORS } from '../constants/constants';

const ApplicationTable = memo(({ 
  applications, 
  onEdit, 
  onDelete 
}) => {
  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || 'status-default';
  };

  return (
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
          {applications.map(app => (
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
                    onClick={() => onEdit(app)} 
                    className="btn-icon btn-edit"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(app.id)} 
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
    </div>
  );
});

ApplicationTable.displayName = 'ApplicationTable';

export default ApplicationTable;
