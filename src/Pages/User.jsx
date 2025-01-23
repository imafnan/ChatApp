import { useEffect, useState } from "react";
import ButtonV1 from "../Components/Common/ButtonV1";
import CommonUserProfile from "../Components/Common/CommonUserProfile";
import { getDatabase, ref, onValue } from "firebase/database";


const User = () => {

    const [alluser , setalluser]=useState()
    // ========= FireBase 
    const db = getDatabase();


    useEffect(()=>{
        onValue(ref(db , 'allUsers'), (snapshot) => {
            let arr =[]
            snapshot.forEach((item)=>{
                arr.push(item.val())
            })
            setalluser(arr)
          });
    },[])
    console.log(alluser);
    




  return (
    <>
      <section className="mt-[48px] w-full">
        <div className="container">
          <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">User</h2>
          {alluser?.map((item, id) => (
        <div key={id} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-5">
          <CommonUserProfile ProfileName={item.userName} ProfileImg={item.userPhoto} />
          <ButtonV1 />
        </div>
      ))}
        </div>
      </section>
    </>
  );
};

export default User;
