import React from 'react';

const Home = React.lazy(() => import("./paginas/Home"));
const Favoritos = React.lazy(() => import("./paginas/Favoritos"));

const routes = [
    { path: "/", exact: true, name: "Home", component: Home },
    { path: "/favoritos", exact: true, name: "Favoritos", component: Favoritos }
]

export default routes;