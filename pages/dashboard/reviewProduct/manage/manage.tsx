//@ts-nocheck
"use client";

import { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { globalConstant } from "constant/constant";

import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { RootState } from "@/app/GlobalRedux/store";
import AddBookForm from "../addForm/addForm";
import EditBookForm from "../editForm/editForm";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation } from "app/GlobalRedux/API/reviewProductApi";
import { excelExport, pdfExport, printTable } from "lib/utilities/utilityFunctions/exportTable";

const ManageGallery = () => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const [getAllRecordForSpecificSchool, { data: allRecordData, error, isLoading: isAllBookDataFetchingLoading }] = useGetAllRecordForSpecificSchoolMutation();
  const [deleteRecord, { data: deleteRecordData, error: deleteBookError, isLoading: isDeleteBookFetchingLoading }] = useDeleteRecordMutation();
  const [dataForViewModel, setDataForViewModel] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [editBookData, setEditBookData] = useState(null); // State variable to track the book being edited
  const [tableData, setTableData] = useState([]); // State variable to store the table data

  const fetchBookAndSetTableData = async () => {
    getAllRecordForSpecificSchool().then((res) => {
      setTableData(res.data?.data);
    });
  };

  useEffect(() => {
    fetchBookAndSetTableData();
  }, []);

  //* edit modal starts here
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenAddBookModel, setIsOpenAddBookModel] = useState(false);
  let [isOpenHolderModel, setIsOpenHolderModel] = useState(false);

  function closeEditModal() {
    setIsOpen(false);
  }

  function openEditModal(bookData) {
    setEditBookData(bookData);
    setIsOpen(true);
  }
  function closeAddBookModal() {
    setIsOpenAddBookModel(false);
  }

  function closeHolderBookModal() {
    setIsOpenHolderModel(false);
  }

  function openViewDetailModal() {
    setIsOpenHolderModel(true);
  }

  function openAddBookModal() {
    setIsOpenAddBookModel(true);
  }

  //* edit modal ends here

  // Filter data based on selected filters
  const filteredData = tableData.filter((item) => {
    if (searchQuery === "") {
      return item;
    }
    if (item.name) {
      if (item.name.toLowerCase().replace(/\s/g, "").includes(searchQuery.toLowerCase().replace(/\s/g, ""))) {
        return item;
      }
    }
  });

  // Create pagination settings
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Change this to your desired page size

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Function to handle book selection
  const handleBookSelect = (isbn) => {
    if (selectedRecords.includes(isbn)) {
      // Deselect the book
      setSelectedRecords(selectedRecords.filter((selectedIsbn) => selectedIsbn !== isbn));
    } else {
      // Select the book
      setSelectedRecords([...selectedRecords, isbn]);
    }
  };

  // Filter data based on pagination
  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const deleteRecordHandler = (id) => {
    deleteRecord({
      id: id,
    }).then((res) => {
      setTableData(tableData.filter((item) => item._id !== id));
      toast.success("Record Deleted Successfully");
    });
  };

  // * EXPORT TABLE LOGIC STARTS HERE
  const exportExcelHandler = () => {
    const option = [
      {
        label: "Bus Code",
        value: "busCode",
      },
      {
        label: "Name",
        value: "name",
      },
      {
        label: "Register Number",
        value: "registerNumber",
      },
      {
        label: "Seats",
        value: "noOfSeats",
      },
      {
        label: "Max Allowed",
        value: "maximumAllowed",
      },
      {
        label: "Type",
        value: "vehicleType",
      },
      {
        label: "Fuel",
        value: "fuelType",
      },
      {
        label: "Contact",
        value: "contactPerson",
      },
      {
        label: "Insurance Renewal Date",
        value: "insuranceRenewalDate",
      },
    ];
    excelExport(option, tableData);
  };

  const exportPdfHandler = () => {
    const columnArray = ["Bus Code", "Name", "Register Number", "Seats", "Max Allowed", "Type", "Fuel", "Contact", "Insurance Renewal Date"];
    const option = ["busCode", "name", "registerNumber", "noOfSeats", "maximumAllowed", "vehicleType", "fuelType", "contactPerson", "insuranceRenewalDate"];
    pdfExport("portrait", "All Vehicles", columnArray, option, tableData);
  };

  const printTableHandler = () => {
    const columnArray = ["Bus Code", "Name", "Register Number", "Seats", "Max Allowed", "Type", "Fuel", "Contact", "Insurance Renewal Date"];
    const option = ["busCode", "name", "registerNumber", "noOfSeats", "maximumAllowed", "vehicleType", "fuelType", "contactPerson", "insuranceRenewalDate"];
    printTable("portrait", "All Vehicles", columnArray, option, tableData);
  };

  return (
    <DashboardOutline pageTitle={"Review Products"} isShowRightSection={true}>
      {/* //! HOLDER MODEL  */}
      <Transition appear show={isOpenHolderModel} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeHolderBookModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='overflow-scroll w-full max-w-4xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='mb-5 text-lg font-medium leading-6 text-gray-900'>
                    Vechicle Detail
                  </Dialog.Title>
                  {dataForViewModel && (
                    <div className='flex flex-col'>
                      <div className='flex flex-col w-fit'>
                        <div className='flex justify-center'>
                          <img className='mt-1 text-sm text-gray-500 w-52' src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${dataForViewModel.attachment}`} />
                        </div>

                        <div className='flex flex-col md:w-1/2'>
                          <div className='flex flex-col'>
                            <div className='flex flex-col'>
                              <label className='block text-sm font-medium text-gray-700'>Bus code</label>
                              <p className='mt-1 text-sm font-bold uppercase text-gray-900'>{dataForViewModel.busCode}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* //! RECORD MODEL  */}
      <Transition appear show={isOpenAddBookModel} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeAddBookModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Add Review Product
                  </Dialog.Title>
                  <AddBookForm fetchBookAndSetTableData={fetchBookAndSetTableData} closeAddModalHandler={closeAddBookModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* //! EDIT RECORD MODEL  */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeEditModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Edit Review Product
                  </Dialog.Title>

                  <EditBookForm closeEditModalHandler={closeEditModal} fetchBookAndSetTableData={fetchBookAndSetTableData} setInitialFormData={setEditBookData} initialFormData={editBookData} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='pb-5 px-1  bg-gray-100'>
        <div className='flex flex-wrap'>
          <button
            onClick={() => {
              openAddBookModal();
            }}
            className='me-2 flex mb-4 justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white p-2 rounded'
          >
            <svg
              style={{
                fill: "white",
              }}
              className='mr-2'
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 448 512'
            >
              <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
            </svg>
            Add Review Product
          </button>
        </div>

        <input autoComplete='off' type='text' placeholder='Search Record' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-full p-3 mb-3 rounded-md' />

        <div className='overflow-auto rounded-lg shadow '>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <th className='p-3'>Actions</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Category</th>
                <th className='p-3'>Attachment</th>
                <th className='p-3'>Description</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {paginatedData.map((item, index) => {
                return (
                  <tr className='bg-white' key={index}>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      <div className='flex flex-col space-x-2'>
                        <div
                          className='flex'
                          style={{
                            marginLeft: 0,
                          }}
                        >
                          <button
                            onClick={() => {
                              deleteRecordHandler(item._id);
                            }}
                            className='flex m-1 w-full justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white p-2 rounded'
                          >
                            <svg
                              style={{
                                fill: "white",
                              }}
                              className='mr-2'
                              xmlns='http://www.w3.org/2000/svg'
                              height='1em'
                              viewBox='0 0 448 512'
                            >
                              <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className='p-3 text-sm  text-gray-400 intel_400 whitespace-nowrap uppercase'>{item.name}</td>
                    <td className='p-3 text-sm  text-gray-400 intel_400 whitespace-nowrap uppercase'>{item.productCategory}</td>
                    <td className='p-3 text-sm text-gray-400 whitespace-nowrap'>
                      {item.attachment !== null ? (
                        <a className='p-1 text-sm  whitespace-nowrap bg-red-400 rounded-sm  hover:bg-white text-white hover:text-red-500 ' href={`${globalConstant.serverURL}/storage/download/${loggedInUserData.schoolUniqueId}/${item.attachment}`}>
                          Download Attachment
                        </a>
                      ) : (
                        <img src='https://i.ibb.co/vVnqvfJ/sss.jpg' alt='Dummy Image' />
                      )}
                    </td>

                    <td className='p-3 text-sm  text-gray-400 intel_400 whitespace-nowrap uppercase'>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex justify-center mt-4"}
          activeClassName={"p-2 rounded bg-green-200 border-2 border-green-500 "}
          pageClassName={"p-2 rounded mx-1 text-green cursor-pointer"}
          previousClassName={"p-2  mr-2 text-green-500 hover:bg-green  cursor-pointer"}
          nextClassName={"p-2 ml-2 text-green-500 hover:bg-green  cursor-pointer"}
        />
      </div>
    </DashboardOutline>
  );
};

export default ManageGallery;
