import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs';
import InputEmoji from "react-input-emoji";




const MsgBox = () => {

  // ============= input
    const [text, setText] = useState("");

    function handleOnEnter(text) {
      console.log("enter", text);
    }
 


  return (
    <>
      <div className="h-[60px] max-sm:mt-3  max-sm:w-[290px] max-sm:mr-3 max-md:w-[400px] w-[1000px]">
        <div className="UserBar bg-gray-300  py-2 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ">
          <div className="flex items-center gap-5">
            <div className="profile w-[45px] h-[45px] rounded-full overflow-hidden bg-red-500">
              <img src="" alt="" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-600">Friends</h2>
            </div>
        </div>
        <div className="MasBox w-full bg-[#F9F7F7] max-sm:h-[50vh] h-[86vh] overflow-y-scroll p-5  ">
           {/* ___________  Send Msg ___________ */}
              <div className="w-fit p-2 bg-blue-300 rounded-[5px] my-3">
                  500Tk dhar deo 
              </div>
           {/* ___________  Recive Msg ___________ */}
              <div className="w-fit p-2 ml-auto bg-[#fff] rounded-[5px] my-3">
                Tk nai
              </div>
        </div>
          <div className="MsgInput flex gap-3 items-center px-5">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
              background="#f0f0f0"
              placeholderColor="black"
              
              />
              <button className='mr-5'>
                <BsSend className='text-[25px] text-red-400 active:scale-[1.2]' />
              </button>
          </div>
      </div>
    </>
  )
}

export default MsgBox