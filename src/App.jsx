import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import SingUp from "./Components/SingUp/SingUp"
import app from "./Firebase"
import SingIn from "./Components/SingIn/SingIn"



const App = () => {

  const myRoute=createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<SingUp/>}/>
      <Route path="/SingIn" element={<SingIn/>}/>
    </Route>
  ))


  return (
    <div>
      <RouterProvider router={myRoute}/>
    </div>
  )
}

export default App
