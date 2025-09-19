import "./App.css";
import StandarLayout from "./Layouts/StandarLayout.jsx";
import Home from "./Pages/Home.jsx";
import Marketplace from "./Pages/Marketplace.jsx";
import News from "./Pages/News.jsx";
import NotFound from "./Pages/NotFound.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Profile from "./Pages/Profile.jsx";
import Register from "./Pages/Register.jsx";
import SignIn from "./Pages/SignIn.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Los imports de axios y useDispatch no son necesarios aquí, se deben usar en los componentes que los requieran (ej. en el slice de Redux)

const router = createBrowserRouter([
  {
    element: <StandarLayout />, // El layout envuelve a todas las páginas que están dentro de 'children'
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/marketplace", element: <Marketplace /> },
      { path: "/news", element: <News /> },
      { path: "/profile", element: <Profile /> },
      { path: "/productDetails/:id", element: <ProductDetails /> },
      { path: "/login", element: <SignIn /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { path: "/*", element: <NotFound /> }, // Ruta para páginas no encontradas
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
