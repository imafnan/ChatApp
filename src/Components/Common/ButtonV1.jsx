import React from "react";

const ButtonV1 = ({buttonV1Click}) => {
  return (
    <>
      <button onClick={buttonV1Click} className=" lg:py-2   max-sm:px-2 px-6 bg-blue-500
       text-white font-semibold max-sm:font-weight rounded-full shadow-lg 
       hover:bg-blue-600 transition duration-300">
        Add
      </button>
    </>
  );
};

export default ButtonV1;
