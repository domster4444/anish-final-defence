//* Refactored
import React, { useCallback, useState, useMemo, Fragment } from "react";
import moment from "moment";
import { Calendar as BigCalendar, CalendarProps, momentLocalizer, Views } from "react-big-calendar";
import { Dialog, Transition } from "@headlessui/react";
import AddForm from "./editForm";

const localizer = momentLocalizer(moment);

interface CalendarComponentProps extends Omit<CalendarProps, "localizer"> {
  fetchRecordAndSetTable: any;
}

export default function Calendar({ fetchRecordAndSetTable, ...props }: CalendarComponentProps) {
  const [isOpenAddRecordModel, setIsOpenAddRecordModel] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState<any>({});

  const closeAddModal = useCallback(() => {
    setIsOpenAddRecordModel(false);
  }, []);

  const openAddBookModal = useCallback(() => {
    setIsOpenAddRecordModel(true);
  }, []);

  const handleSelectEvent = useCallback(
    (event: any) => {
      setSelectedEventDetails(event);
      openAddBookModal();
    },
    [openAddBookModal]
  );

  return (
    <>
      {/* //! ADD Record MODEL */}
      <Transition appear show={isOpenAddRecordModel} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeAddModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Update Event
                  </Dialog.Title>
                  <AddForm fetchRecordAndSetTable={fetchRecordAndSetTable} selectedEventDetails={selectedEventDetails} closeAddModalHandler={closeAddModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <BigCalendar defaultView={Views.MONTH} onSelectEvent={handleSelectEvent} selectable localizer={localizer} {...props} />
    </>
  );
}
