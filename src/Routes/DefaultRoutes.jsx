import React from 'react'
const ProductsDetails = React.lazy(() => import('../pages/ProductsDetails/ProductsDetails'));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage/LoginPage"))


const DefaultRoutes = ([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/products/:cod", element: <ProductsDetails /> }
])

export default DefaultRoutes