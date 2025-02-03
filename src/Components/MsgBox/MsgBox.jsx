import React, { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import InputEmoji from "react-input-emoji";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const MsgBox = () => {
  // State variables
  const [allmsg, setallmsg] = useState([]);
  const [text, setText] = useState("");

  // Redux Data
  const ChatData = useSelector((state) => state.ChatUserData.value);
  const currentUser = useSelector((state) => state.authUser.value);

  // Firebase Database
  const db = getDatabase();

  // Function to send message
  const handleOnEnter = () => {
    const trimmedText = text.trim();
    console.log("Sending Message: ", trimmedText);
    
    if (!trimmedText) {
      alert("⚠️ Message cannot be empty!");
      return;
    }
    
    push(ref(db, 'allMsg/'), {
      msg: trimmedText,
      senderId: currentUser?.uid,
      receverId: ChatData?.friendId,
      timestamp: Date.now()
    }).then(() => {
      console.log("✅ Message sent successfully");
      setText('');
    }).catch(error => {
      console.error("🔥 Error sending message: ", error);
      alert("🚨 Failed to send message. Please try again!");
    });
  };

  // Fetch Real-time Messages
  useEffect(() => {
    const msgRef = ref(db, 'allMsg/');
    return onValue(msgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const msgData = item.val();
        if (msgData.msg && msgData.msg.trim() !== "" && 
          ((msgData.senderId === currentUser?.uid && msgData.receverId === ChatData?.friendId) ||
          (msgData.receverId === currentUser?.uid && msgData.senderId === ChatData?.friendId))) {
          arr.push({ ...msgData, key: item.key });
        }
      });
      arr.sort((a, b) => a.timestamp - b.timestamp); // Sort messages chronologically
      setallmsg(arr);
      console.log("📩 Messages loaded: ", arr);
    }, (error) => {
      console.error("⚠️ Error fetching messages: ", error);
    });
  }, [ChatData, currentUser?.uid, db]);

  return (
    <>
      <div className="h-[60px] max-sm:mt-3 max-sm:w-[290px] max-sm:mr-3 max-md:w-[400px] w-[1000px]">
        {/* User Info Bar */}
        <div className="UserBar bg-gray-300 py-2 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="flex items-center gap-5">
            <div className="profile w-[45px] h-[45px] rounded-full overflow-hidden bg-red-500">
              <img src={ChatData?.friendPhoto} alt="" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-600">{ChatData?.friendName}</h2>
          </div>
        </div>

        {/* Message Box */}
        <div className="MasBox w-full bg-[#F9F7F7] max-sm:h-[50vh] h-[83vh] overflow-y-scroll p-5">
          {allmsg.map((item) => (
            item.senderId === currentUser?.uid ? (
              <div key={item.key} className="w-fit p-2 ml-auto bg-[#fff] rounded-[5px] my-3">
                {item.msg}
              </div>
            ) : (
              <div key={item.key} className="w-fit p-2 bg-blue-300 rounded-[5px] my-3">
                {item.msg}
              </div>
            )
          ))}
        </div>

        {/* Message Input */}
        <div className="MsgInput flex gap-3 items-center px-5 bg-[#F9F7F7]">
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter={false}
            onEnter={handleOnEnter}
            placeholder="Type a message"
            background="#f0f0f0"
            placeholderColor="black"
          />
          <button className='mr-5' onClick={handleOnEnter}>
            <BsSend className='text-[25px] text-red-400 active:scale-[1.2]' />
          </button>
        </div>
      </div>
    </>
  );
};

export default MsgBox;
