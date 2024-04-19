"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "app/context/ChatAuthContext";
import "app/globals.css";

const ToasterContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </div>
  );
};

export default ToasterContext;
