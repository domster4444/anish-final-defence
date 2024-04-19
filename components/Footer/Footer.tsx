//@ts-nocheck
import Link from "next/link";

const Index = () => {
  return (
    <>
      <div class='px-4 py-12 mx-auto '>
        <div class='grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-11 lg:gap-20'>
          <div class='col-span-3'>
            <a href='#' title='Hellonext Home Page' class='flex items-center'>
              <img
                src='https://i.ibb.co/kQWsp5X/review-recommend-file-logo-1.png'
                style={{
                  height: "70px",
                }}
                alt=''
              />
              <span class='sr-only'>Kutty Home Page</span>
            </a>
            <p class='my-4 text-xs leading-normal text-gray-600'>
              Hosted in the EU 🇪🇺, with <strong>no user tracking</strong> scripts. Made all over the world by{" "}
              <a href='#' class='underline' target='_blank'>
                17 amazing people
              </a>
              .
            </p>
          </div>
          <nav class='col-span-1 md:col-span-1 lg:col-span-2'>
            <p class='mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>Product</p>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Features
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Pricing
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Feedback
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              FAQs
            </a>
          </nav>
          <nav class='col-span-2 md:col-span-1 lg:col-span-2'>
            <p class='mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>Support</p>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Chat
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              {" "}
              Email Support{" "}
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              GDPR
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              {" "}
              Help{" "}
            </a>
          </nav>
          <nav class='col-span-1 md:col-span-1 lg:col-span-2'>
            <p class='mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>Resources</p>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Blog
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              {" "}
              Twitter{" "}
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Alternatives
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Why feature vote?
            </a>
          </nav>
          <nav class='col-span-1 md:col-span-1 lg:col-span-2'>
            <p class='mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>Company</p>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              About Us
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Privacy
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Terms
            </a>
            <a class='flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-purple-800' href='#'>
              Status
            </a>
          </nav>
        </div>
        <div class='flex flex-col items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center'>
          <p class='mb-2 text-xs text-left text-gray-600 md:mb-0'>Built by Product Managers, for Product Managers.</p>
          <p class='mb-0 text-xs text-left text-gray-600 md:mb-0'>Copyright &copy; 2020 Hellonext</p>
        </div>
      </div>
    </>
  );
};

export default Index;
