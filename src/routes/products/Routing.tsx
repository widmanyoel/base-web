import { Routes, Navigate , Route } from "react-router-dom";
import Products from "../../pages/products/Products";
import AddProduct from "../../pages/products/AddProduct";
import DetailsProduct from "../../pages/products/DetailsProduct";
import UpdateProduct from "../../pages/products/UpdateProduct";


const ProductsRouting = () => {
  return (
    <div>
      <Routes>          
        <Route path="/products" element={<Products/>} />
        <Route path="/products/details/:id" element={<DetailsProduct/>} />
        <Route path="/products/update/:id" element={<UpdateProduct/>}/>
        <Route path="/products/add" element={<Navigate to="/products/add"/>}/>
      </Routes>
    </div>
  );
};

export default ProductsRouting;