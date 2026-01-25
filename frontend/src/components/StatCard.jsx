import React, { memo } from 'react';

const StatCard = memo(({ icon: Icon, label, count, colorClass }) => {
  return (
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
});

StatCard.displayName = 'StatCard';

export default StatCard;