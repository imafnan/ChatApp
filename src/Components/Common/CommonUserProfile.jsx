
import React from "react";

const CommonUserProfile = ({ProfileName ,ProfileImg ,TextSize}) => {
  return (
    <>
      <div className="CommonUserProfile flex items-center gap-4">
        <div className="UserProfileImg max-sm:w-[30px] w-[60px] max-sm:h-[30px] h-[60px] rounded-full bg-gray-200 overflow-hidden border-2 border-gray-400">
          <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className={`text-[18px] max-sm:text-[15px] font-semibold text-gray-700 ${TextSize}`}>{ProfileName}</h2>
        </div>
      </div>
    </>
  );
};

export default CommonUserProfile;

