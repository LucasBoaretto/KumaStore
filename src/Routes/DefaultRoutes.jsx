import React from 'react'

const ProductsDetails = React.lazy(() => import('../pages/ProductsDetails/ProductsDetails'));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const CartPage = React.lazy(() => import("../pages/CartPage/CartPage"))

const DefaultRoutes = ([
    { path: "/", element: <HomePage /> },
    { path: "/produto/:id", element: <ProductsDetails /> },
    { path: "/cart", element: <CartPage /> }
])

export default DefaultRoutes