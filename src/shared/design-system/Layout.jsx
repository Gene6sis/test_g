import React from 'react';
import './Layout.css';

const Layout = ({ children, className = '' }) => {
  return (
    <div className={`design-system-layout ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
