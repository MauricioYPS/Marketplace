import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from
  'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Carousel from './Props/Carrousel'
import Header from "./Props/Header"
import Body from './Props/Body'
import Footer from './Props/Footer'
import Home from './Pages/Home'
import Cities from './Pages/Cities'
import NotFound from './Pages/NotFound'
import City from './Pages/CityDetails'
import SingIn from './Pages/SingIn'
import './App.css'
import StandardLayout from './Layouts/StandardLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from './store/actions/authActions'
import PrivateRoute from './Props/PrivateRoute'
import SignRoute from './Props/SignRoute'
import SingUp from './Pages/SignUp'

const router = createBrowserRouter([
  {
    element: <StandardLayout></StandardLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/cities", element:<PrivateRoute> <Cities></Cities></PrivateRoute>},
      { path: "/citySelected/:id", element: <City></City> },
      { path: "/singIn", element: <SignRoute><SingIn></SingIn></SignRoute> },
      { path: "/singUp", element: <SingUp></SingUp> },
    ],
  },
  { path: "/*", element: <NotFound></NotFound> },
])

const loginWithToken = async (token) => {
  try {
    console.log("se ejecuto loginWithToken");

    const response = await axios.get("http://localhost:8080/api/users/validationToken",
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
    return response.data.response

  } catch (error) {
    console.log("error", error);

  }
}
function App() {
  const dispatch = useDispatch(setUser);
  let token = localStorage.getItem("token");
  if (token) {
    loginWithToken(token).then((user)=>{
      dispatch(setUser({user,token}))
    })

  }
  return (
    <>
      <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
