import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar/Navbar"

const Layout = () => {
  
  const SliceUser = useSelector((state)=>state.authUser.value)
  const Navigate =useNavigate()
  useEffect(()=>{
    if(SliceUser == null){
        Navigate('/SingIn')
    }
  },[])
  

  return (
    <div className="flex gap-[25px]">
      <Navbar/>
     <Outlet/> 
    </div>
  )
}

export default Layout
