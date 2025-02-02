import React from 'react'
import MasList from '../Components/MsgList/MasList'
import MsgBox from '../Components/MsgBox/MsgBox'


const Msg = () => {
  return (
    <>
        <div className="max-md:flex flex max-sm:block">
            <MasList/>
            <MsgBox/>
        </div>
    </>
  )
}

export default Msg