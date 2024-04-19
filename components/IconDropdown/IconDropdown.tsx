import { Fragment } from "react";

import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

const IconDropdown = ({ menu, children }: { menu: any; children: React.ReactNode }) => {
  return (
    <Popover className='relative'>
      <Popover.Button>{children}</Popover.Button>
      <Transition as={Fragment} enter='transition ease-out duration-200' enterFrom='opacity-0 translate-y-1' enterTo='opacity-100 translate-y-0' leave='transition ease-in duration-150' leaveFrom='opacity-100 translate-y-0' leaveTo='opacity-0 translate-y-1'>
        <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl'>
          <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='relative grid gap-8 bg-white p-7 lg:grid-cols-2'>
              {menu.map((item: any) => (
                <Link key={item.name} href={item.href} className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12'>
                    <item.icon aria-hidden='true' />
                  </div>
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                    <p className='text-sm text-gray-500'>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className='bg-gray-50 p-4'>
              <Link href='##' className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
                <span className='flex items-center'>
                  <span className='text-sm font-medium text-gray-900'>Documentation</span>
                </span>
                <span className='block text-sm text-gray-500'>Start integrating products and tools</span>
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default IconDropdown;
