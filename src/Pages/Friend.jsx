import React, { useEffect, useState } from 'react';
import CommonUserProfile from '../Components/Common/CommonUserProfile';
import ButtonV1 from '../Components/Common/ButtonV1';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';

const Friend = () => {
  // ========== Custom State
  const [allFriends, setAllFriends] = useState([]);

  // ========== Redux Variable
  const currentUser = useSelector((state) => state.authUser.value);

  // ========= Firebase Variable
  const db = getDatabase();

  // ======= Fetch Friend Requests
  useEffect(() => {
    if (!currentUser) return; // Prevent errors if currentUser is undefined

    const friendsRef = ref(db, 'friends/');
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const data = item.val();

        if (data.friendId === currentUser.uid) {
          arr.push({
            friendId: data.acptPersonId,
            friendName: data.acptPersonName,
            friendPhoto: data.acptPersonPhoto,
            key: item.key,
          });
        } else if (data.acptPersonId === currentUser.uid) {
          arr.push({
            friendId: data.friendId,
            friendName: data.friendName,
            friendPhoto: data.friendPhoto,
            key: item.key,
          });
        }
      });

      setAllFriends(arr);
    });
  }, [currentUser, db]); // Added dependencies to ensure proper updates

  return (
    <section className="mt-[48px] w-full">
      <div className="container">
        <h2 className="text-[22px] font-bold text-gray-400 mb-4">Friends</h2>

        {allFriends.length > 0 ? (
          allFriends.map((item) => (
            <div key={item.key} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
              <CommonUserProfile ProfileName={item.friendName} ProfileImg={item.friendPhoto} />
              <div className="flex gap-4">
                <ButtonV1 buttonV1Text="Unfriend" buttonV1TextBg="bg-blue-500" />
                <ButtonV1 buttonV1Text="Block" buttonV1TextBg="bg-red-500" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No friends found.</p>
        )}
      </div>
    </section>
  );
};

export default Friend;
