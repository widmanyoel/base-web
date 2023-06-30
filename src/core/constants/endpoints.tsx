export const endpoints = {
  user: {
    login: '/auth/local',
  },
  product:
  {
    getProducts :"/products?populate=*",
    getProduct:"/products/:id?populate=*",
    addProducts :"/products",
    editProduct: "/products/:id",
    detailsProduct:"/products/:id?populate=*",
    updateProduct: "/products/:id",
    deleteProduct: "/products/:id",
    getCategoryProducts: "/products?populate=*&filters[category][id][$eq]=:id",
  },
  categori:
  {
    getCategories :"/categories",
    getRaitings :"/raitings",
  },
  upload:
  {
    addFile :"/upload",
  }
}