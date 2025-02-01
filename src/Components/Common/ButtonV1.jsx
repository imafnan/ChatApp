import React from "react";

const ButtonV1 = ({ buttonV1Click, buttonV1Text ,buttonV1TextBg }) => {
  return (
    <>
      <button 
        onClick={buttonV1Click} 
        className={`lg:py-3 max-md:py-1.5 max-sm:px-2 px-6 max-sm:text-[13px] max-sm:font-normal font-semibold max-sm:font-weight 
        rounded-full max-sm:rounded-[5px] shadow-lg transition duration-300 ${buttonV1TextBg}
        ${buttonV1Text} 
        text-white`}
      >
        {buttonV1Text} 
      </button>
    </>
  );
};

export default ButtonV1;
