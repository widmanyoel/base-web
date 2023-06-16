import React from 'react';
import { Link } from 'react-router-dom';
const MyButtonAdd = () => {
    return (
      <Link to="/products/add" style={{color: "#FFF", textDecoration: 'none' }} >
        RegistrarProducto
      </Link>
    );
  };
  
  export default MyButtonAdd;