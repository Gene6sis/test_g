import React from 'react';
import './Error.css';

const Error = ({ children, variant = 'error', className = '', ...props }) => {
  return (
    <div className={`design-system-error ${variant} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Error;
