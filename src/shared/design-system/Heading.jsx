import React from 'react';
import './Heading.css';

const Heading = ({ children, level = 1, className = '', ...props }) => {
  const Tag = `h${level}`;
  
  return (
    <Tag className={`design-system-heading h${level} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
