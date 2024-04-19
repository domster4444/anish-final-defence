//@ts-nocheck
//* Refactored
import { FC, ReactNode } from "react";
import { Fragment, useEffect, useState } from "react";

import Clock from "react-live-clock";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { globalConstant } from "constant/constant";
import { NextUIProvider } from "@nextui-org/react";
import useOnlineStatus from "@rehooks/online-status";
import { Dialog, Transition } from "@headlessui/react";
import type, { RootState } from "@/app/GlobalRedux/store";
import GlobalSearchInput from "@/components/GlobalSearchInput";
import { useGetUserCountMutation } from "app/GlobalRedux/API/schoolUserAuthApi";
import { DashboardSideDrawerToggleLogic, ShowSideDrawerForLargeScreens } from "lib/utilities/utilityFunctions/sidedrawerToggleLogic";
import usFlag from "public/assets/usFlag.png";
import nepalFlag from "public/assets/nepalFlag.png";

import DashboardSideDrawer from "../DashboardSideDrawer";

import "app/globals.css";
import "@/app/styles/global.css";

import "../dashboard-base.css";

type DashboardOutlineProps = {
  pageTitle: string;
  isShowRightSection: boolean;
  children: ReactNode;
};

const DashboardOutline: FC<DashboardOutlineProps> = ({ pageTitle, isShowRightSection, children }: DashboardOutlineProps) => {
  const router = useRouter();
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const { loggedInUserToken } = loggedInUserData;

  console.log("loggedInUserData result is =======", loggedInUserData);

  const [getUserCount, { data: userCountData, error: userCountError, isLoading: userCountLoading }] = useGetUserCountMutation();
  let [isOpenAddBookModel, setIsOpenAddBookModel] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //student
  const [studentBoyCount, setStudentBoyCount] = useState(0);
  const [studentGirlCount, setStudentGirlCount] = useState(0);
  const [studentOtherCount, setStudentOtherCount] = useState(0);
  //accountant
  const [accountantCount, setAccountantCount] = useState(0);
  //librarian
  const [librarianCount, setLibrarianCount] = useState(0);
  //parents
  const [parentCount, setParentCount] = useState(0);
  //staff
  const [staffCount, setStaffCount] = useState(0);
  const [maleStaffCount, setMaleStaffCount] = useState(0);
  const [femaleStaffCount, setFemaleStaffCount] = useState(0);
  const [otherStaffCount, setOtherStaffCount] = useState(0);
  //teacher
  const [teacherCount, setTeacherCount] = useState(0);
  const [maleTeacherCount, setMaleTeacherCount] = useState(0);
  const [femaleTeacherCount, setFemaleTeacherCount] = useState(0);
  const [otherTeacherCount, setOtherTeacherCount] = useState(0);

  //* how toast if user is offline
  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    toast.error("You are offline. Please check your internet connection.");
  }

  // * function to get user count i.e staff, students, parents
  const getAndSetUserCount = () => {
    getUserCount()
      .unwrap()
      .then((res) => {
        const { boysCount, girlsCount, othersCount, totalAccountantCount, totalLibrarianCount, totalParentCount, totalStaffCount, femaleStaff, maleStaff, otherStaff, totalTeacherCount, femaleTeacher, maleTeacher, otherTeacher } = res.data;
        // student
        setStudentBoyCount(boysCount);
        setStudentGirlCount(girlsCount);
        setStudentOtherCount(othersCount);

        // accountant
        setAccountantCount(totalAccountantCount);
        // librarian
        setLibrarianCount(totalLibrarianCount);

        // parent
        setParentCount(totalParentCount);

        //teacher
        setTeacherCount(totalTeacherCount);
        setMaleTeacherCount(maleTeacher);
        setFemaleTeacherCount(femaleTeacher);
        setOtherTeacherCount(otherTeacher);

        // staff
        setStaffCount(totalStaffCount);
        setMaleStaffCount(maleStaff);
        setFemaleStaffCount(femaleStaff);
        setOtherStaffCount(otherStaff);
      });
  };

  //* if user is not logged in then redirect to login page
  if (!loggedInUserToken) {
    router.push("/");
  }

  //* tutorial model close handler
  function closeAddModal() {
    setIsOpenAddBookModel(false);
  }

  //* tutorial model open handler
  function openAddBookModal() {
    setIsOpenAddBookModel(true);
  }

  useEffect(() => {
    DashboardSideDrawerToggleLogic();
    getAndSetUserCount();
  }, []);

  ShowSideDrawerForLargeScreens();

  return (
    <>
      <NextUIProvider>
        <Head>
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons+Sharp' rel='stylesheet' />
        </Head>

        <main className='dashboard-main'>
          <div className='container'>
            <DashboardSideDrawer role={loggedInUserData.role} schoolName={loggedInUserData.schoolName?.toUpperCase().split(" ")[0] + " SCHOOL"} />
            <main
              style={{
                overflow: "scroll",
              }}
            >
              {/* //! Tutorial MODEL  */}
              <Transition appear show={isOpenAddBookModel} as={Fragment}>
                <Dialog as='div' className='relative z-50' onClose={closeAddModal}>
                  <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-black/25' />
                  </Transition.Child>
                  <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                      <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                        <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'></Dialog.Title>
                          <iframe
                            allow='autoplay'
                            width='100%'
                            height='350'
                            src={`https://www.youtube.com/embed/FxBBuxE6XTI?si=1JtkGikU-4ARMXPD` + "?rel=0&autoplay=1"}
                            title='Opera One Is Here'
                            frameborder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowfullscreen
                          ></iframe>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {children}
            </main>
            <div className='right-section'>
              <div
                className='nav'
                style={{
                  zIndex: 10,
                }}
              >
                <button id='menu-btn'>
                  <span className='material-icons-sharp hover:bg-gray-100 rounded-md p-2'> menu </span>
                </button>
              </div>
              <div className='user-profile'>
                <div className='logo'>
                  {loggedInUserData.schoolImage ? (
                    <img
                      style={{
                        height: "3rem",
                      }}
                      className=' rounded cursor-pointer'
                      src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${loggedInUserData.schoolImage}`}
                      alt=' Logo'
                    />
                  ) : (
                    <img className='rounded cursor-pointer w-12' src='https://i.ibb.co/vVnqvfJ/sss.jpg' alt='Dummy Image' />
                  )}
                  <h2>{loggedInUserData.schoolName?.toUpperCase().split(" ")[0]}</h2>
                  <p>{loggedInUserData.schoolStreet}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </NextUIProvider>
    </>
  );
};

export default DashboardOutline;
