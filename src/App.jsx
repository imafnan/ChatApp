import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import SingUp from "./Components/SingUp/SingUp"
import app from "./Firebase"
import SingIn from "./Components/SingIn/SingIn"
import { ToastContainer } from "react-toastify"
import Home from "./Pages/Home"



const App = () => {

  const myRoute=createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<SingUp/>}/>
      <Route path="/SingIn" element={<SingIn/>}/>
      <Route path="/Home" element={<Home/>}/>
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
