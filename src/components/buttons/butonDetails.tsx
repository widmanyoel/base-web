import React from 'react';
import { Link } from 'react-router-dom';
const MyButtonDetails = () => {
    return (
      <Link to="/products/details/:id" style={{ color: "#FFF" ,textDecoration: 'none' }}>
        DetalleProducto
      </Link>
    );
  };
  
  export default MyButtonDetails;