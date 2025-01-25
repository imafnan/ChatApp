import { useEffect, useState } from "react";
import ButtonV1 from "../Components/Common/ButtonV1";
import CommonUserProfile from "../Components/Common/CommonUserProfile";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";


const User = () => {

    const [alluser , setalluser]=useState()
    // ========== Redux Variable
      const currentUser = useSelector((state)=>state.authUser.value)


    // ========= FireBase Variable
    const db = getDatabase();

    // ========= All Funtions
    const handelAddFriend =()=>{
      alert('ok kaj kore')
    }


    useEffect(()=>{
        onValue(ref(db , 'allUsers'), (snapshot) => {
            let arr =[]
            snapshot.forEach((item)=>{
              if(item.key != currentUser.uid){
                arr.push(item.val())
              }
            })
            setalluser(arr)
          });
    },[])
    




  return (
    <>
      <section className="mt-[48px] w-full">
        <div className="container">
          <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">User</h2>
          {alluser?.map((item, id) => (
        <div key={id} className="flex  justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
          <CommonUserProfile ProfileName={item.userName} ProfileImg={item.userPhoto} />
          <ButtonV1  buttonV1Click={handelAddFriend}  />
        </div>
      ))}
        </div>
      </section>
    </>
  );
};

export default User;
