//@ts-nocheck
import { useEffect, useState } from "react";

import Drawer from "react-modern-drawer";

import Link from "next/link";
import Image from "next/image";
import IconDropdown from "components/IconDropdown";
import { ContainedButtonSm, GhostButtonSm } from "components/Button/Button";

import "react-modern-drawer/dist/index.css";

const Nav = ({ noDropdownMenuData, fullWidthDropDownMenuData, primaryDropdownData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }, []);

  return (
    <nav className='bg-white relative px-2 py-4 box-shadow'>
      <div className='section-container flex justify-between items-center'>
        <div id='hamburger-panel' className='block ng:hidden hover:bg-gray-100 p-2 rounded-md'>
          <button className='flex flex-col items-center justify-between w-9 h-8 p-1' onClick={toggleDrawer}>
            <div className='w-full h-1 primary-blue-bg rounded'></div>
            <div className='w-full h-1 primary-blue-bg rounded my-1'></div>
            <div className='w-full h-1 primary-blue-bg rounded'></div>
          </button>
          <Drawer open={isOpen} onClose={toggleDrawer} direction='right' className='bla bla bla'>
            <div className='hamburger-content'>
              <div className='sidenav'>
                <Link className='intel_400' href='/'>
                  Home
                </Link>

                <Link className='intel_400' href='/login'>
                  Try for free
                </Link>
              </div>
            </div>
          </Drawer>
        </div>

        <Link href='/'>
          <Image
            style={{
              height: "5.5rem",
            }}
            height={140}
            width={140}
            src='https://i.ibb.co/kQWsp5X/review-recommend-file-logo-1.png'
            alt='your school software logo'
          />
        </Link>

        <ul className='hidden ng:block ng:flex  items-center space-x-6'>
          <li>
            <Link className='nav-menu px-3 py-3 rounded-md  ' href='/'>
              Home
            </Link>
          </li>

          <li>
            <Link className='nav-menu' href={`/userLogin`}>
              <GhostButtonSm>UserLogin</GhostButtonSm>
            </Link>
          </li>
          <li>
            <Link className='nav-menu' href={`/login`}>
              <GhostButtonSm>Admin Login</GhostButtonSm>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
