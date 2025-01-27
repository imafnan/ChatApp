import React from "react";

const ButtonV1 = ({ buttonV1Click, buttonV1Text ,buttonV1TextBg }) => {
  return (
    <>
      <button 
        onClick={buttonV1Click} 
        className={`lg:py-2 max-sm:px-2 px-6 font-semibold max-sm:font-weight 
        rounded-full shadow-lg transition duration-300 ${buttonV1TextBg}
        ${buttonV1Text} 
        text-white`}
      >
        {buttonV1Text} 
      </button>
    </>
  );
};

export default ButtonV1;
