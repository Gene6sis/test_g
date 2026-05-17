import React from 'react';
import './Input.css';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`design-system-input ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
