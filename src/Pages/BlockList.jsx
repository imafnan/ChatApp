import React, { useEffect, useState } from 'react'
import CommonUserProfile from '../Components/Common/CommonUserProfile'
import ButtonV1 from '../Components/Common/ButtonV1'
import { getDatabase, onValue, push, ref, remove, set, } from 'firebase/database';
import { useSelector } from 'react-redux';

const BlockList = () => {
     // ========== Custom State
  const [allBlockFriends, setAllBlockFriends] = useState([]);

  // ========== Redux Variable
  const currentUser = useSelector((state) => state.authUser.value);

  // ========= Firebase Variable
  const db = getDatabase();

  // =========== All function
  const handelUnblock =(unBlockData)=>{
       set(push(ref(db, 'friends/')), {
            friendId:unBlockData.BlockfriendId,
            friendName:unBlockData.BlockfriendName,
            friendPhoto:unBlockData.BlockfriendPhoto,
            acptPersonId: currentUser.uid,
            acptPersonName:currentUser.displayName,
            acptPersonPhoto:currentUser.photoURL,
          });
          remove(ref(db ,'blockFriend/' + unBlockData.key))
  }
    


  // ======= Fetch Friend Requests
  useEffect(()=>{
      onValue(ref(db , 'blockFriend/'), (snapshot) => {
        let arr =[]
        snapshot.forEach((item)=>{
            if(item.val().currentUserId == currentUser.uid){
                arr.push({...item.val() , key:item.key})
            }
        })
        setAllBlockFriends(arr)
      });
  },[])
    
   
  return (
    <>
        <section className="mt-[48px] w-full">
            <div className="container">
                <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">Block List</h2>
          {
            allBlockFriends.map((item)=>(
                <div  key={item.key} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
                    <CommonUserProfile ProfileName={item.BlockfriendName} ProfileImg={item.BlockfriendPhoto} />
                    <div className="flex gap-4">
                    <ButtonV1 buttonV1Click={()=>handelUnblock(item)} buttonV1Text="Unblock"  buttonV1TextBg={"bg-blue-500"}/>
                    </div>
                </div>
            ))
          }
            </div>
        </section>
    </>
  )
}

export default BlockList