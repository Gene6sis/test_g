import React from 'react';
import './Feedback.css';

const Feedback = ({ children, type = 'info', className = '', ...props }) => {
  return (
    <div className={`design-system-feedback ${type} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Feedback;
