import React from 'react';
import './CardComponent.css'; // Import your CSS file

const CardComponent = ({ color, icon, title, value, unit, percentage }) => {
  return (
    <div className="card" style={{ background: color }}>
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <span className="card-title">{title}</span>
      </div>
      <div className="card-value">
        {value}
        <span className="card-unit">{unit}</span>
      </div>

      {percentage &&
        <div className="card-progress">
          <div className="card-progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      }
      {percentage &&
        <div className="card-percentage">{percentage}%</div>
      }
    </div>
  );
};

export default CardComponent;
