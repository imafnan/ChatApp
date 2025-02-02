import React, { useEffect, useState } from 'react'
import { BsSend } from 'react-icons/bs';
import InputEmoji from "react-input-emoji";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from "firebase/database";





const MsgBox = () => {

  // ========== custom variables
  const [allmsg , setallmsg]=useState([])

  //============ Redux Data
  const ChatData = useSelector((state) => state.ChatUserData.value);
  const currentUser = useSelector((state) => state.authUser.value);
  

  // ============= Firebase 
  const db = getDatabase();

  // ============= Emoji 
    const [text, setText] = useState("");

  // =============== All function
    const handleOnEnter =()=> {
      setText('')
      set(push(ref(db, 'allMsg/')), {
          msg:text,
          senderId:currentUser.uid,
          receverId:ChatData.friendId,

      });
    }
    
  // ==========  RealTime Data
  useEffect(()=>{
    onValue(ref(db ,'allMsg/'), (snapshot) => {
        let arr =[]
        snapshot.forEach((item)=>{
          if(item.val().senderId == currentUser.uid && item.val().receverId == ChatData.friendId){
            arr.push({...item.val() , key:item.key})
          }
          else if(item.val().receverId == currentUser.uid && item.val().senderId == ChatData.friendId){
            arr.push({...item.val() , key:item.key})
          }
        })   
        setallmsg(arr)   
    });
  },[ChatData])
    


  return (
    <>
      <div className="h-[60px] max-sm:mt-3  max-sm:w-[290px] max-sm:mr-3 max-md:w-[400px] w-[1000px]">
       
        <div className="UserBar bg-gray-300  py-2 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ">
          <div className="flex items-center gap-5">
            <div className="profile w-[45px] h-[45px] rounded-full overflow-hidden bg-red-500">
              <img src={ChatData?.friendPhoto} alt="" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-600">{ChatData?.friendName}</h2>
            </div>
        </div>
       
        <div className="MasBox w-full bg-[#F9F7F7] max-sm:h-[50vh] h-[83vh] overflow-y-scroll p-5  ">
          {
            allmsg.map((item)=>(
              item.senderId == currentUser.uid ?
                // ___________  Send Msg ___________ 
                <div key={item.key} className="w-fit p-2 ml-auto bg-[#fff] rounded-[5px] my-3">
                  {item.msg}
                </div>
                :
                //  ___________  Recive Msg ___________ 
                <div key={item.key}   className="w-fit p-2 bg-blue-300 rounded-[5px] my-3">
                  {item.msg}
                </div>
            ))
          }
          
        </div>
          <div className="MsgInput flex gap-3 items-center px-5 bg-[#F9F7F7]">
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
                <BsSend onClick={handleOnEnter} className='text-[25px] text-red-400 active:scale-[1.2]' />
              </button>
          </div>
      </div>
    </>
  )
}

export default MsgBox