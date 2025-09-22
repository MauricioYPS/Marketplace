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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { logout, setUser } from "./store/actions/authActions";

const API_URL = "http://localhost:8080/api";

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
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
  { path: "/*", element: <NotFound /> },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
      return;
    }

    const validateToken = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/validationToken`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data ?? {};
        const user =
          data.user ?? data.profile ?? data.response ?? data?.data ?? data ?? null;

        dispatch(setUser({ user, token }));
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch (error) {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          dispatch(logout());
        } else {
          console.error("Token validation failed", error);
        }
      }
    };

    validateToken();
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
