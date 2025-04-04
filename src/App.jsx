import './App.css'
import StandarLayout from './Layouts/StandarLayout.jsx'
import Home from './Pages/Home.jsx'
import Marketplace from './Pages/Marketplace.jsx'
import NotFound from './Pages/NotFound.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'


const router = createBrowserRouter([
  {
    element: <StandarLayout></StandarLayout>,
    children: [
      { path: "/", element: <Home></Home>},
      { path: "/home", element: <Home></Home>},
      { path: "/marketplace", element: <Marketplace></Marketplace>},
    ],
  },
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
