import { useEffect, useState } from "react";
import ButtonV1 from "../Components/Common/ButtonV1";
import CommonUserProfile from "../Components/Common/CommonUserProfile";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const Requests = () => {
    const [allrequest, setAllRequest] = useState([]);

    // Redux Variable
    const currentUser = useSelector((state) => state.authUser.value);

    // Firebase Variable
    const db = getDatabase();

    // ====== Friend Request Remove Function ======
    const handelRemove = (removeReq) => {
        remove(ref(db, `friendrequest/${removeReq}`));
    };

    // ====== Friend Request Accept Function ======
    const handelAccept = (acptData) => {
        set(push(ref(db, 'friends')), {
            friendId: acptData.sendeId,
            friendName: acptData.senderName,
            friendPhoto: acptData.senderPhoto,
            acptPersonId: currentUser.uid,
            acptPersonName: currentUser.displayName,
            acptPersonPhoto: currentUser.photoURL,
        });

        // Remove from friend request list
        remove(ref(db, `friendrequest/${acptData.key}`));
    };

    // ========= Fetch Friend Requests =========
    useEffect(() => {
        const requestRef = ref(db, "friendrequest");

        onValue(requestRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().sendeId !== currentUser.uid && item.val().receverId === currentUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            });
            setAllRequest(arr);
        });
    }, [db, currentUser.uid]);

    return (
        <>
            <section className="mt-[48px] w-full">
                <div className="container">
                    <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">Friend Requests</h2>
                    {allrequest.length > 0 ? (
                        allrequest.map((item, i) => (
                            <div key={i} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
                                <CommonUserProfile ProfileImg={item.senderPhoto} ProfileName={item.senderName} />
                                <div className="flex gap-4">
                                    <ButtonV1 buttonV1Click={() => handelAccept(item)} buttonV1Text="Confirm" buttonV1TextBg={"bg-blue-500"} />
                                    <ButtonV1 buttonV1Click={() => handelRemove(item.key)} buttonV1Text={"Remove"} buttonV1TextBg={"bg-red-500"} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No Friend Requests</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Requests;
