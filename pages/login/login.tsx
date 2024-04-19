//@ts-nocheck
"use client";

import { useEffect, useState } from "react";

import { NextPage } from "next";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/router";
import { toastConfig } from "constant/constant";
import { storeDataByValue } from "services/LocalStorageService";

import "app/globals.css";
import "@/app/styles/global.css";

// * redux
import type { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setSchoolName,
  setSchoolImage,
  setSchoolStreet,
  setAccountId,
  setSchoolId,
  setSchoolUniqueId,
  setImage,
  setLoggedInUserPackage,
  setLoggedInUserAccountStatus,
  setLoggedInUserPackageRenewalDate,
  setLoggedInUserToken,
  setName,
  setEmail,
  setRole,
  setIsUserLoggedIn,
  setIsSchoolLoggedIn,
  setCurrentClass,
} from "@/app/GlobalRedux/Features/authenticatedSlice/authenticatedSlice";

//* rtk query imports
import { usePostSchoolLoginMutation, usePostUserLoginMutation } from "@/app/GlobalRedux/API/authenticationApi";

const LoginPage: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.authenticated.email);
  const loggedInUserPackage = useSelector((state: RootState) => state.authenticated.loggedInUserPackage);
  const loggedInUserAccountStatus = useSelector((state: RootState) => state.authenticated.loggedInUserAccountStatus);
  const loggedInUserPackageRenewalDate = useSelector((state: RootState) => state.authenticated.loggedInUserPackageRenewalDate);
  const loggedInUserToken = useSelector((state: RootState) => state.authenticated.loggedInUserToken);
  const isSchoolLoggedIn = useSelector((state: RootState) => state.authenticated.isSchoolLoggedIn);
  const isUserLoggedIn = useSelector((state: RootState) => state.authenticated.isUserLoggedIn);
  const schoolUniqueId = useSelector((state: RootState) => state.authenticated.schoolUniqueId);
  const image = useSelector((state: RootState) => state.authenticated.image);
  const schoolId = useSelector((state: RootState) => state.authenticated.schoolId);
  const role = useSelector((state: RootState) => state.authenticated.role);
  const accountId = useSelector((state: RootState) => state.authenticated.accountId);
  const name = useSelector((state: RootState) => state.authenticated.name);
  const schoolName = useSelector((state: RootState) => state.authenticated.schoolName);
  const schoolImage = useSelector((state: RootState) => state.authenticated.schoolImage);
  const schoolStreet = useSelector((state: RootState) => state.authenticated.schoolStreet);

  const [SchoolLogin, { isLoading: schoolLoginIsLoading, isError: schoolLoginIsError, isSuccess: schoolLoginIsSuccess, data: loggedInSchoolData }] = usePostSchoolLoginMutation();
  const [UserLogin, { isLoading: userLoginIsLoading, isError: userLoginIsError, isSuccess: userLoginIsSuccess, data: loggedInUserData }] = usePostUserLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState<"school" | "user">("school"); // ["school", "user"
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedInUserToken) {
      router.push("/dashboard/review/reviewProductList/manage/manage");
    }
  }, [loggedInUserToken]);

  //* Automatically Clear Error Message after 4 seconds
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  //* Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username.");
    } else if (password.length < 6 || !/[A-Za-z]/.test(password)) {
      setError("Password must be at least 6 characters long and include a symbol and an alphabet.");
    } else {
      let dataToSend = {};

      if (loginType === "school") {
        dataToSend = {
          school_email: username,
          password: password,
        };
        SchoolLogin(dataToSend).then((res: any) => {
          if (res.error) {
            setError(res.error.data.message);
            toast.info(`${res.error.data.message}`, toastConfig);
            return;
          }

          console.log(res.data.data);
          storeDataByValue("schoolUniqueId", res.data.data.schoolUniqueId);
          storeDataByValue("schoolId", res.data.data.schoolId);

          if (res.data?.success) {
            //? check if res.data.data  have school_email as key
            if (res.data.data.school_email) {
              toast.info(`${res.data.message}`, toastConfig);
              const { name, role, image, schoolUniqueId, school_email, school_package, account_status, school_package_renewal_date, _id, street, currentClass } = res.data.data;
              dispatch(setName(name));
              dispatch(setEmail(school_email));
              dispatch(setLoggedInUserPackage(school_package));
              dispatch(setLoggedInUserAccountStatus(account_status));
              dispatch(setLoggedInUserPackageRenewalDate(school_package_renewal_date));
              dispatch(setLoggedInUserToken(res.data.token));
              dispatch(setIsSchoolLoggedIn(true));
              dispatch(setIsUserLoggedIn(false));
              dispatch(setSchoolUniqueId(schoolUniqueId));
              dispatch(setImage(image));
              dispatch(setSchoolId(_id));
              dispatch(setRole(role));
              dispatch(setAccountId(_id));
              dispatch(setSchoolName(name));
              dispatch(setSchoolImage(image));
              dispatch(setSchoolStreet(street));

              //* redirect to school dashboard
              router.push("/dashboard/review/reviewProductList/manage/manage");
            }
          }
        });
      } else if (loginType === "user") {
        console.warn("THis is good");
        dataToSend = {
          email: username,
          password: password,
        };
        UserLogin(dataToSend).then((res: any) => {
          if (res.error) {
            setError(res.error.data.message);

            toast.info(`${res.error.data.message}`, toastConfig);
          }

          if (res.data?.success) {
            //? check if res.data.data don't have school_email as key
            if (!res.data?.data?.school_email) {
              toast.info(`${res.data.message}`, toastConfig);
              const { email, image, role, schoolId, schoolUniqueId, userId, name, schoolName, schoolStreet, schoolImage, currentClass } = res.data.data;
              dispatch(setName(name));
              dispatch(setAccountId(userId));
              dispatch(setEmail(email));
              dispatch(setRole(role));
              dispatch(setImage(image));
              dispatch(setLoggedInUserToken(res.data.token));
              dispatch(setIsSchoolLoggedIn(false));
              dispatch(setIsUserLoggedIn(true));
              dispatch(setSchoolId(schoolId));
              dispatch(setSchoolUniqueId(schoolUniqueId));
              dispatch(setSchoolName(schoolName));
              dispatch(setSchoolImage(schoolImage));
              dispatch(setSchoolStreet(schoolStreet));
              //only for student
              dispatch(setCurrentClass(currentClass));

              // * redirect to school dashboard
              router.push("/dashboard/review/reviewProductList/manage/manage");
            }
          }
        });
      }
    }
  };

  if (schoolLoginIsLoading || userLoginIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section class='bg-gray-50'>
        <div class='px-4 py-20 mx-auto max-w-7xl'>
          <a href='/' title='Kutty Home Page' class='flex items-center justify-start sm:justify-center'>
            <img
              src='https://i.ibb.co/kQWsp5X/review-recommend-file-logo-1.png'
              style={{
                height: "70px",
              }}
              alt=''
            />
            <span class='sr-only'>Kutty</span>
          </a>
          <div class='w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg md:bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5'>
            <h1 class='mb-5 text-xl font-light text-left text-gray-800 sm:text-center'>Log in to your account</h1>
            <form class='pb-1 space-y-4'>
              <label class='block'>
                <span class='block mb-1 text-xs font-medium text-gray-700'>Your Email</span>
                <input
                  style={{
                    width: "100%",
                    borderRadius: "0.25rem",
                  }}
                  autoComplete='off'
                  placeholder='Username'
                  className='intel_400'
                  type='text'
                  name='username'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label class='block'>
                <span class='block mb-1 text-xs font-medium text-gray-700'>Your Password</span>
                <input
                  style={{
                    width: "100%",
                    borderRadius: "0.25rem",
                  }}
                  autoComplete='off'
                  placeholder='Password'
                  className='intel_400'
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div class='flex items-center justify-between'>
                <label class='flex items-center'>
                  <input type='checkbox' class='form-checkbox' />
                  <span class='block ml-2 text-xs font-medium text-gray-700 cursor-pointer'>Remember me</span>
                </label>

                <button type='submit' onClick={handleLogin} class='btn btn-primary'>
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
