import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import SingUp from "./Components/SingUp/SingUp"
import app from "./Firebase"
import SingIn from "./Components/SingIn/SingIn"
import { ToastContainer } from "react-toastify"
import Home from "./Pages/Home"
import Layout from "./Layout/Layout"
import ResetPass from "./Components/ResetPass/ResetPass"
import User from "./Pages/User"
import Requests from "./Pages/Requests"



const App = () => {

  const myRoute=createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/SingUp" element={<SingUp/>}/>
      <Route path="/SingIn" element={<SingIn/>}/>
      <Route path="/ResetPass" element={<ResetPass/>}/>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/User" element={<User/>}/>
        <Route path="/friendRequests" element={<Requests/>}/>
      </Route>
    </Route>
  ))


  return (
    <>
    <div>
      <RouterProvider router={myRoute}/>
    </div>
     <ToastContainer />
    </>
  )
}

export default App
