import React from 'react';
import { Link } from 'react-router-dom';
const MyButton = () => {
    return (
      <Link to="/products" style={{ color: "#FFF" ,textDecoration: 'none' }}>
        Productos        
      </Link>
    );
  };
  
  export default MyButton;