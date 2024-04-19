//@ts-nocheck
import { useEffect } from "react";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AOS from "aos";
import { ToastContainer } from "react-toastify";

import RootLayout from "../app/layout";

import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 120,
      once: false,
    });

    // TODO: Below code disables right click and inspect mode
    // // Disable right-click
    // document.addEventListener("contextmenu", (e) => e.preventDefault());

    // function ctrlShiftKey(e, keyCode) {
    //   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    // }

    // document.onkeydown = (e) => {
    //   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    //   if (event.keyCode === 123 || ctrlShiftKey(e, "I") || ctrlShiftKey(e, "J") || ctrlShiftKey(e, "C") || (e.ctrlKey && e.keyCode === "U".charCodeAt(0))) return false;
    // };
  }, []);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <RootLayout>
          <Component {...pageProps} />
          <ToastContainer position='top-center' autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        </RootLayout>
      </DndProvider>
    </>
  );
}
export default MyApp;
