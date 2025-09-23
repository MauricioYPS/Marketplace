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

const API_URL = "https://apimarketplace.devmauricioy.com/api";


const extractUser = (rawUser) => {
  if (!rawUser) return null;
  if (Array.isArray(rawUser)) {
    return extractUser(rawUser[0]);
  }
  if (rawUser.response !== undefined) {
    return extractUser(rawUser.response);
  }
  if (rawUser.user !== undefined) {
    return extractUser(rawUser.user);
  }
  if (rawUser.data !== undefined) {
    return extractUser(rawUser.data);
  }
  return rawUser;
};

const normalizeUser = (user) => {
  const extracted = extractUser(user);
  if (!extracted) return null;
  const normalized = { ...extracted };
  if (!normalized._id && normalized.id) {
    normalized._id = normalized.id;
  }
  return normalized;
};

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
        const user = normalizeUser(
          data.user ?? data.profile ?? data.response ?? data?.data ?? data ?? null
        );

        dispatch(setUser({ user, token }));
        
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        
      } catch (error) {
        const status = error.response?.status;
        console.log("status", status);
        
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
