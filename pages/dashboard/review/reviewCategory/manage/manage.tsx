//@ts-nocheck
import { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import AddForm from "../addForm";
import EditForm from "../editForm";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { useDeleteRecordMutation, useGetAllRecordForSpecificSchoolMutation } from "app/GlobalRedux/API/reviewCategoryApi";

import { excelExport, pdfExport, printTable } from "lib/utilities/utilityFunctions/exportTable";

const ManageGallery = () => {
  const [getAllRecordForSpecificSchool, { data: allRecordData, error: isFetchAllRecordDataError, isLoading: isAllRecordFetchingLoading }] = useGetAllRecordForSpecificSchoolMutation();
  const [deleteRecord, { data: deleteRecordData, error: isDeleteRecordError, isLoading: isDeleteRecordLoading }] = useDeleteRecordMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [updateData, setEditData] = useState(null); // State variable to track the book being edited
  const [tableData, setTableData] = useState([]); // State variable to store the table data
  const [dataToFilterFrom, setDataToFilterFrom] = useState([]); // State variable to store the table data

  const fetchRecordAndSetTable = async () => {
    getAllRecordForSpecificSchool().then((res) => {
      setTableData(res.data.data);
      setDataToFilterFrom(res.data.data);
    });
  };

  useEffect(() => {
    fetchRecordAndSetTable();
  }, []);

  //* MODEL OPEN CLOSE FUNCTIONs Starts here
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenAddBookModel, setIsOpenAddBookModel] = useState(false);

  function closeEditModal() {
    setIsOpen(false);
  }

  function openEditModal(bookData) {
    setEditData(bookData);
    setIsOpen(true);
  }
  function closeAddModal() {
    setIsOpenAddBookModel(false);
  }

  function openAddBookModal() {
    setIsOpenAddBookModel(true);
  }
  //* MODEL OPEN CLOSE FUNCTIONs Ends here

  //* ALL FILTER LOGIC SHALL BE HERE
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

  // * PAGINATION LOGIC STARTS HERE
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Change this to your desired page size

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  // * PAGINATION LOGIC ENDS HERE

  //* Function to handle book selection STARTS HERE
  const handleRecordSelect = (id) => {
    if (selectedRecords.includes(id)) {
      // Deselect the book
      setSelectedRecords(selectedRecords.filter((selectedId) => selectedId !== id));
    } else {
      // Select the book
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  //* Function to handle book selection ENDS HERE

  // Filter data based on pagination
  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const deleteRecordHandler = (recordId) => {
    deleteRecord({
      id: recordId,
    }).then((res) => {
      setTableData(tableData.filter((book) => book._id !== recordId));
      toast.success(" Deleted Successfully");
    });
  };

  // * EXPORT TABLE LOGIC STARTS HERE
  const exportExcelHandler = () => {
    const option = [
      {
        label: "Designation",
        value: "name",
      },
      {
        label: "Description",
        value: "description",
      },
    ];
    excelExport(option, tableData);
  };

  const exportPdfHandler = () => {
    const columnArray = ["Designation", "Description"];
    const option = ["name", "description"];
    pdfExport("portrait", "All Designations", columnArray, option, tableData);
  };

  const printTableHandler = () => {
    const columnArray = ["Designation", "Description"];
    const option = ["name", "description"];
    printTable("portrait", "All Designations", columnArray, option, tableData);
  };

  return (
    <DashboardOutline pageTitle={"Review Category"} isShowRightSection={true}>
      {/* //! ADD Record MODEL  */}
      <Transition appear show={isOpenAddBookModel} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeAddModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Add Review Category
                  </Dialog.Title>
                  <AddForm fetchRecordAndSetTable={fetchRecordAndSetTable} closeAddModalHandler={closeAddModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* //! EDIT Record MODEL  */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeEditModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Edit Review Category
                  </Dialog.Title>
                  <EditForm closeEditModalHandler={closeEditModal} fetchRecordAndSetTable={fetchRecordAndSetTable} setInitialFormData={setEditData} initialFormData={updateData} />
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
            Add Review Category
          </button>
        </div>

        <input autoComplete='off' type='text' placeholder='Search  by name or room number...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-full p-3 mb-3 rounded-md' />

        <div className='overflow-auto rounded-lg shadow '>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <th className='p-3'>Actions</th>
                <th className='p-3'>S.n</th>
                <th className='p-3'>Designation Name</th>
                <th className='p-3'>Description</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {paginatedData.map((item, index) => (
                <tr className='bg-white' key={index}>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    <div className='flex flex-col space-x-2'>
                      <div
                        className='flex'
                        style={{
                          marginLeft: 0,
                        }}
                      >
                        <button onClick={() => openEditModal(item)} className='flex m-1 w-full justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 text-white p-2 rounded'>
                          <svg
                            style={{
                              fill: "white",
                            }}
                            className='mr-2'
                            xmlns='http://www.w3.org/2000/svg'
                            height='1em'
                            viewBox='0 0 512 512'
                          >
                            <path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' />
                          </svg>
                          Edit
                        </button>

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

                  <td className='p-3 text-sm font-bold text-gray-400 intel_400 whitespace-nowrap uppercase'>
                    <center>{index + 1}</center>
                  </td>

                  <td className='p-3 text-sm font-bold text-gray-400 intel_400 whitespace-nowrap'>
                    <center>{item.name}</center>
                  </td>
                  <td className='p-3 text-sm   text-gray-400 intel_400 whitespace-nowrap '>
                    <div
                      style={{
                        width: "200px",
                        wordWrap: "break-word!important",
                        whiteSpace: "normal",
                        overflow: "visible",
                      }}
                    >
                      {item.description}
                    </div>
                  </td>
                </tr>
              ))}
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
