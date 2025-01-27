import { useEffect, useState } from "react";
import ButtonV1 from "../Components/Common/ButtonV1";
import CommonUserProfile from "../Components/Common/CommonUserProfile";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const Requests = () => {
     // ========== Redux Variable
     const currentUser = useSelector((state) => state.authUser.value);

     const [allrequest ,setallrequest] =useState([])

    // ========= FireBase Variable
        const db = getDatabase();
    

     // ========= Fetch All Users
        useEffect(() => {
            onValue(ref(db , 'friendquest/'), (snapshot) => {
                let arr = []
                snapshot.forEach((item) => {
                    if(item.val().sendeId !=currentUser.uid && item.val().receverId ==currentUser.uid){
                        arr.push(item.val())
                    }
                });
                setallrequest(arr)
            });
        }, []);
    



  return (
    <>
      <section className="mt-[48px] w-full">
        <div className="container">
          <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">
            Friend Requests
          </h2>
          {
            allrequest.map((item ,i)=>(
                <div key={i} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
                    <CommonUserProfile  ProfileImg={item.senderPhoto}  ProfileName={item.senderName} />
                    <div className="flex gap-4">
                    <ButtonV1 buttonV1Text="Confirm"  buttonV1TextBg={"bg-blue-500"}/>
                    <ButtonV1 buttonV1Text={"Remove"}  buttonV1TextBg={'bg-red-500'}/>
                    </div>
                </div>
            ))
          }
        </div>
      </section>
    </>
  );
};

export default Requests;
