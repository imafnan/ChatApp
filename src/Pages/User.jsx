import { useEffect, useState } from "react";
import ButtonV1 from "../Components/Common/ButtonV1";
import CommonUserProfile from "../Components/Common/CommonUserProfile";
import { getDatabase, ref, onValue , push, get, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const User = () => {
    const [alluser , setAllUser] = useState([]);
    const [sentRequests, setSentRequests] = useState({});
    
    // ========== Redux Variable
    const currentUser = useSelector((state) => state.authUser.value);

    // ========= FireBase Variable
    const db = getDatabase();

    // =========  Friend Requests 
    useEffect(() => {
        const requestRef = ref(db, 'friendrequest ');

        onValue(requestRef, (snapshot) => {
            let requests = {};
            snapshot.forEach(childSnapshot => {
                const request = childSnapshot.val();
                if (request.sendeId === currentUser.uid) {
                    requests[request.receverId] = childSnapshot.key; 
                }
            });
            setSentRequests(requests);
        });
    }, []);

    // ========= Fetch All Users
    useEffect(() => {
        onValue(ref(db , 'allUsers'), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.key !== currentUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            });
            setAllUser(arr);
        });
    }, [currentUser.uid]);

    // ========= Handle Add   And  Cancel Friend Request
    const handelAddFriend = (userData) => { 
        const requestRef = ref(db, 'friendrequest ');

        if (sentRequests[userData.key]) {
            remove(ref(db, `friendrequest /${sentRequests[userData.key]}`))
            .then(() => {
              toast.info('Friend request canceled!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
                setSentRequests((prev) => {
                    const updatedRequests = { ...prev };
                    delete updatedRequests[userData.key]; 
                    return updatedRequests;
                });
            })
            
        } else {
            //  new request 
            const newRequestRef = push(requestRef); 

            set(newRequestRef, {
                sendeId: currentUser.uid,
                senderName: currentUser.displayName,
                senderPhoto: currentUser.photoURL,
                receverId: userData.key,
                receverName: userData.userName,
                receverPhoto: userData.userPhoto
            }).then(() => {
              toast.success('Friend request sent successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
                setSentRequests((prev) => ({
                    ...prev,
                    [userData.key]: newRequestRef.key 
                }));
            })
        }
    };

    return (
        <>
            <section className="mt-[48px] w-full">
                <div className="container">
                    <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">User</h2>
                    {alluser?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center w-full my-2 bg-white shadow-md rounded-lg p-3">
                            <CommonUserProfile ProfileName={item.userName} ProfileImg={item.userPhoto} />
                            <ButtonV1 
                                buttonV1Click={() => handelAddFriend(item)}  
                                buttonV1Text={sentRequests[item.key] ? "Cancel" : "Add"} 
                                buttonV1TextBg={sentRequests[item.key] ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} 
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default User;
