export const endpoints = {
  user: {
    login: '/auth/login',
    //login: '/users',
  },
  product:
  {
    getProducts :"/products",
    addProducts :"/products",
    editProduct: "/products/:id",
    detailsProduct:"/products/:id",
    updateProduct: "/products/:id",
    deleteProduct: "/products/:id",
  },
  categori:
  {
    getCategories :"products/categories",
  }
}