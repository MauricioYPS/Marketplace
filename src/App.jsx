import './App.css'
import StandarLayout from './Layouts/StandarLayout.jsx'
import Home from './Pages/Home.jsx'
import Marketplace from './Pages/Marketplace.jsx'
import NotFound from './Pages/NotFound.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'
import News from './Pages/News.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import ProfileBussiness from './Pages/ProfileBussines.jsx'
import Login from './SignIn/Login.jsx'
import Register from './SignIn/Register.jsx'


const router = createBrowserRouter([
  {
    element: <StandarLayout></StandarLayout>,
    children: [
      { path: "/", element: <Home></Home>},
      { path: "/home", element: <Home></Home>},
      { path: "/marketplace", element: <Marketplace></Marketplace>},
      { path: "/news", element: <News></News>},
      { path: "/productDetails/:id", element: <ProductDetails></ProductDetails>},
      { path: "/profileBussines", element: <ProfileBussiness></ProfileBussiness>}
    ],
  },
  { path: "/login", element: <Login></Login> },
  { path: "/register", element: <Register></Register> },
  { path: "/*", element: <NotFound></NotFound> },
])


function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
