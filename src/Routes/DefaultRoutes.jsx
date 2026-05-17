import React from 'react'
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));


const DefaultRoutes = ([
    { path: "/", element: <HomePage /> }
])

export default DefaultRoutes