import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonUserProfile from '../Common/CommonUserProfile';

const MasList = () => {

    // ========== Custom State
    const [allFriends, setAllFriends] = useState([]);

    // ========== Redux Variable
    const currentUser = useSelector((state) => state.authUser.value);
    const ChatData = useSelector((state) => state.ChatUserData.value);
  
    // ========= Firebase Variable
    const db = getDatabase();
  
    // =========== All function
  
   

  
    // ======= Fetch Friend Requests
      useEffect(()=>{
          onValue(ref(db , 'friends/'), (snapshot) => {
            let arr =[];
            snapshot.forEach((item)=>{
              if (item.val().friendId == currentUser.uid) {
                arr.push({
                  friendId: item.val().acptPersonId,
                  friendName: item.val().acptPersonName,
                  friendPhoto: item.val().acptPersonPhoto,
                  key: item.key,
                });
              } else if (item.val().acptPersonId == currentUser.uid) {
                arr.push({
                  friendId: item.val().friendId,
                  friendName: item.val().friendName,
                  friendPhoto: item.val().friendPhoto,
                  key: item.key,
                });
              }
            })
            setAllFriends(arr)
          });
      },[])
        



console.log(allFriends);







  return (
    <>    
         <div className="max-md:w-[290px]  w-[400px] max-sm:h-[200px] h-[100vh] pt-5 overflow-y-scroll bg-gray-200 px-2">
      <h2 className="text-[22px] font-bold text-gray-400 mb-4">Friends</h2>
      {
        allFriends.map((item) => (
          <div  key={item.key} className="flex items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
            <CommonUserProfile  ProfileName={item.friendName} ProfileImg={item.friendPhoto} TextSize={'max-sm:text-[12px] max-md:text-[12px]'} />
          </div>
        ))
      }
    </div>
    </>
  )
}

export default MasList