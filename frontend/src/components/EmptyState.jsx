import React from 'react';
import { Briefcase } from 'lucide-react';

const EmptyState = ({ searchTerm, filterStatus }) => {
  return (
    <div className="empty-state">
      <Briefcase size={48} />
      <p>No applications found</p>
      <p className="empty-subtitle">
        {searchTerm || filterStatus !== 'All' 
          ? 'Try adjusting your search or filter' 
          : 'Add your first job application to get started!'}
      </p>
    </div>
  );
};

export default EmptyState;