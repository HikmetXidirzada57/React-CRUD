import React from "react";
import { ToastContainer } from "react-toastify";
const Toast = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default Toast;
