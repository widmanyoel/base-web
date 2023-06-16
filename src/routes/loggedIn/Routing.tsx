import React from "react";
import { Container } from "@mui/material";
import { Routes, Navigate , Route } from "react-router-dom";
import NotFound  from "../../pages/notFound/NotFound";
import Products from "../../pages/products/Products";
import DetailsProduct from "../../pages/products/DetailsProduct";
import AddProduct from "../../pages/products/AddProduct";
import UpdateProduct from "../../pages/products/UpdateProduct";

const LoggedInRouting = () => {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<Products/>} />
        <Route path="/products/add" element={<AddProduct/>}/>
        <Route path="/products/update/:id" element={<UpdateProduct/>}/>
        <Route path="/products/details/:id" Component={DetailsProduct} />
        <Route path="/logout" element={<Container>Adios</Container>} />
        <Route path="/not-found" Component={NotFound} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default LoggedInRouting;
