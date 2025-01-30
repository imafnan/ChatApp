import React, { useEffect, useState } from 'react';
import CommonUserProfile from '../Components/Common/CommonUserProfile';
import ButtonV1 from '../Components/Common/ButtonV1';
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';
import { useSelector } from 'react-redux';

const Friend = () => {
  // ========== Custom State
  const [allFriends, setAllFriends] = useState([]);

  // ========== Redux Variable
  const currentUser = useSelector((state) => state.authUser.value);

  // ========= Firebase Variable
  const db = getDatabase();

  // =========== All function

  // ///////// HandelUnFriend
  const handelUnfriend =(undefinedData)=>{
    remove(ref(db ,'friends/' + undefinedData.key))

  }


  // ////////// Handel Block
  const handelBlock =(blockData)=>{
    set(push(ref(db, 'blockFriend/')), {
    currentUserId:currentUser.uid,
     BlockfriendId:blockData.friendId,
     BlockfriendName:blockData.friendName,
     BlockfriendPhoto:blockData.friendPhoto,
    }); 
    remove(ref(db ,'friends/' + blockData.key))
    
  }


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
      
   
  return (
    <section className="mt-[48px] w-full">
      <div className="container">
        <h2 className="text-[22px] font-bold text-gray-400 mb-4">Friends</h2>

        {

          allFriends.map((item) => (
            <div key={item.key} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
              <CommonUserProfile ProfileName={item.friendName} ProfileImg={item.friendPhoto} />
              <div className="flex gap-4">
                <ButtonV1 buttonV1Click={()=>handelUnfriend(item)} buttonV1Text="Unfriend" buttonV1TextBg="bg-blue-500" />
                <ButtonV1 buttonV1Click={()=>handelBlock(item)} buttonV1Text="Block" buttonV1TextBg="bg-red-500" />
              </div>
            </div>
          ))
        }
       
      </div>
    </section>
  );
};

export default Friend;
