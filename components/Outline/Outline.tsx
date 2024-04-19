//@ts-nocheck
import ScrollToTop from "react-scroll-to-top";

import Nav from "@/components/Nav";
import Footer from "components/Footer";

import "app/globals.css";
import "@/app/styles/global.css";

import { useEffect } from "react";
const Outline = ({ children }: any) => {
  function Video() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <circle cx='24' cy='24' r='8' fill='none' stroke='#FB923C' strokeWidth='2' />
        <path d='M30 24L22 18V30L30 24Z' fill='#FB923C' />
      </svg>
    );
  }

  function MobileApp() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <rect x='15' y='10' width='18' height='28' rx='2' fill='#FDBA74' />
        <rect x='19' y='6' width='10' height='4' rx='2' fill='#FDBA74' />
        <rect x='18' y='12' width='12' height='20' rx='2' fill='#FFFFFF' />
        <circle cx='24' cy='38' r='2' fill='#FDBA74' />
      </svg>
    );
  }

  function MultiSchool() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <path d='M15 37L24 27L33 37V16H15V37Z' fill='#FDBA74' />
        <rect x='18' y='30' width='4' height='4' fill='#FFFFFF' />
        <rect x='26' y='30' width='4' height='4' fill='#FFFFFF' />
      </svg>
    );
  }
  function Book() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <path d='M18 36H30V22H18V36Z' fill='#FDBA74' />
        <path d='M18 22H30V12H18V22Z' fill='#FB923C' />
        <path d='M16 38H32V12H16V38Z' fill='#FDBA74' />
        <path d='M20 36V14H28V36H20Z' fill='#FB923C' />
      </svg>
    );
  }
  function CustomERP() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <path d='M15 12L12 16L15 20L18 16L15 12Z' fill='#FDBA74' />
        <path d='M30 12L27 16L30 20L33 16L30 12Z' fill='#FDBA74' />
        <path d='M16 28L24 36L32 28H16Z' fill='#FDBA74' />
        <path d='M19 24H29' stroke='#FB923C' strokeWidth='2' />
        <path d='M15 38H33' stroke='#FB923C' strokeWidth='2' />
      </svg>
    );
  }
  function Integration() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <path d='M22 14V18H18V22H22V26H26V22H30V18H26V14H22Z' fill='#FDBA74' />
        <path d='M16 32H32' stroke='#FB923C' strokeWidth='2' />
        <path d='M20 36H28' stroke='#FB923C' strokeWidth='2' />
      </svg>
    );
  }
  function OneZeroOne() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='#FDBA74'>
          101
        </text>
      </svg>
    );
  }
  function FAQ() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
        <rect width='48' height='48' rx='8' fill='#FFEDD5' />
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='30' fill='#FDBA74'>
          ?
        </text>
      </svg>
    );
  }

  const fullWidthDropDownMenuData = [
    {
      name: "Feature Tour",
      description: "Explore our feature tour to learn how to measure actions your users take.",
      href: "/featuresTour",
      icon: Video,
    },
    {
      name: "Mobile App",
      description: "Access your school management system through our mobile app for added convenience.",
      href: "/mobileAppPage",
      icon: MobileApp,
    },

    {
      name: "Student Information System",
      description: "Manage student data efficiently with our information system.",
      href: "/sisPage",
      icon: Book,
    },

    {
      name: "Integration",
      description: "Simplify your operations by integrating with our school management system.",
      href: "/integrationPage",
      icon: Integration,
    },
    {
      name: "Why Choose Us",
      description: "Discover reasons why our system is the right choice for you.",
      href: "/whyChooseUsPage",
      icon: OneZeroOne,
    },
    {
      name: "FAQ",
      description: "Find answers to common questions about our services and solutions.",
      href: "/#faq_section",
      icon: FAQ,
    },
  ];

  const primaryDropdownData = [
    {
      name: "Resources",
      subMenus: [
        {
          name: "Blog",
          link: "/blog",
        },
        {
          name: "Ebook",
          link: "/ebookPage",
        },
      ],
    },
    {
      name: "About",
      subMenus: [
        {
          name: "Our Story",
          link: "/ourStory",
        },
        {
          name: "Core Team",
          link: "/ourTeam",
        },
        {
          name: "Our Customers",
          link: "/ourCustomer",
        },
        {
          name: "Company Career",
          link: "/careerPage",
        },
      ],
    },
  ];
  const noDropdownMenuData = [
    // {
    //   name: "Pricing",
    //   link: "/pricing",
    // },
    {
      name: "Contact",
      link: "/contactPage",
    },
  ];

  return (
    <div>
      <header className='w-full sticky top-0 z-10 '>
        <Nav noDropdownMenuData={noDropdownMenuData} primaryDropdownData={primaryDropdownData} fullWidthDropDownMenuData={fullWidthDropDownMenuData} />
      </header>
      {children}
      <div id='chat-container'></div>

      <Footer />
      <ScrollToTop smooth />
    </div>
  );
};

export default Outline;
