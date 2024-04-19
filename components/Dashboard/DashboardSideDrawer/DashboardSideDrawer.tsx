//* Refactored
//@ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { toastConfig } from "constant/constant";
import TestIcon from "public/assets/All_Menu.svg";
import calendarSvg from "public/assets/calendar.svg";
import { removeDataByValue } from "services/LocalStorageService";
import { logout } from "@/app/GlobalRedux/Features/authenticatedSlice/authenticatedSlice";
import { menus } from "./SidedrawerMenus";
import type, { RootState } from "@/app/GlobalRedux/store";

interface Dropdowns {
  library: boolean;
  anotherDropdown: boolean;
}

interface MenuItem {
  label: string;
  link: string;
  svg?: string;
  subMenus?: SubMenu[];
}

interface SubMenu {
  label: string;
  link: string;
  svg?: string;
}

const DashboardSideDrawer: React.FC<{ role: string; schoolName: string }> = ({ role, schoolName }) => {
  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state: any) => state.authenticated);
  const [dropdowns, setDropdowns] = useState<Dropdowns>({
    library: false,
    anotherDropdown: false,
  });
  const [activeMenu, setActiveMenu] = useState<string>("");

  const toggleDropdown = (dropdownName: string) => {
    setDropdowns({
      ...dropdowns,
      [dropdownName]: !dropdowns[dropdownName],
    });
  };

  const handleMenuClick = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu("");
      return;
    }
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
  };

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
      setDropdowns({
        ...dropdowns,
        [storedActiveMenu]: true,
      });
    }
  }, []);

  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const filteredMenus = useMemo(() => {
    const sortedMenus = menus.slice().sort((a, b) => a.label.localeCompare(b.label));

    return sortedMenus.filter((menu) => {
      const menuLabelMatches = menu.label.toLowerCase().includes(filterValue.toLowerCase());
      const subMenuLabelMatches = menu.subMenus ? menu.subMenus.some((subMenu) => subMenu.label.toLowerCase().includes(filterValue.toLowerCase())) : false;

      return menuLabelMatches || subMenuLabelMatches;
    });
  }, [filterValue]);

  return (
    <aside className='z-20'>
      <div className='toggle'>
        <div className='close' id='close-btn'>
          <span className='material-icons-sharp hover:bg-gray-100 p-2 rounded-md'> close </span>
        </div>
      </div>

      <div className='sidebar intel_400'>
        {filteredMenus.map((menu, index) => {
          if (!menu.role?.includes(loggedInUserData.role)) return null;

          return (
            <div key={index} className='sidedrawer-menu-container'>
              {menu.subMenus ? (
                <div
                  className={`sidedrawer-dropdn ${activeMenu === menu.label ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick(menu.label);
                    toggleDropdown(menu.label);
                  }}
                >
                  <h3>{menu.label}</h3>
                  <svg className={`dropdown-chevron ${dropdowns[menu.label] ? "up-side-down" : ""}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                    <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                  </svg>
                </div>
              ) : (
                <Link
                  href={menu.link}
                  className={`sidedrawer-dropdn ${activeMenu === menu.label ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick(menu.label);
                  }}
                >
                  <h3>{menu.label}</h3>
                </Link>
              )}

              {menu.subMenus && (
                <div className={`sidedrawer-dropdown-list ${dropdowns[menu.label] ? "" : "hidden"}`}>
                  <ul>
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <Link key={subIndex} href={subMenu.link}>
                        <li>
                          <h4>{subMenu.label}</h4>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <div className='sidedrawer-menu-container'>
          <div
            className='sidedrawer-dropdn'
            onClick={() => {
              removeDataByValue();
              dispatch(logout());
              removeDataByValue("loggedInUserData");
              toast.success("Logged out successfully", toastConfig);
            }}
          >
            <h3>Logout</h3>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideDrawer;
