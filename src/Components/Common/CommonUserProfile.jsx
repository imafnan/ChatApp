
import React from "react";

const CommonUserProfile = ({ProfileName ,ProfileImg}) => {
  return (
    <>
      <div className="CommonUserProfile flex items-center gap-4">
        <div className="UserProfileImg w-[60px] h-[60px] rounded-full bg-gray-200 overflow-hidden border-2 border-gray-400">
          <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold text-gray-700">{ProfileName}</h2>
        </div>
      </div>
    </>
  );
};

export default CommonUserProfile;

