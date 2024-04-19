//@ts-nocheck

import { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";

import { Fragment, useEffect, useState } from "react";
import { globalConstant } from "constant/constant";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import AddForm from "../addForm";
import EditForm from "../editForm";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { useDeleteRecordMutation, useGetAllSchoolsMutation } from "app/GlobalRedux/API/schoolApi";
import { excelExport, pdfExport, printTable } from "lib/utilities/utilityFunctions/exportTable";

import "app/globals.css";
import "@/app/styles/global.css";

const ManageGallery = () => {
  const pdfExportComponent = useRef(null);

  const [rangeValue, setRangeValue] = useState([5, 88]);

  const router = useRouter();
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const [getAllRecordForSpecificSchool, { data: allRecordData, error: isFetchAllRecordDataError, isLoading: isAllRecordFetchingLoading }] = useGetAllSchoolsMutation();
  const [deleteRecord, { data: deleteRecordData, error: isDeleteRecordError, isLoading: isDeleteRecordLoading }] = useDeleteRecordMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [editBookData, setEditBookData] = useState(null); // State variable to track the book being edited
  const [tableData, setTableData] = useState([]); // State variable to store the table data
  const [dataToFilterFrom, setDataToFilterFrom] = useState([]); // State variable to store the table data

  const fetchRecordAndSetTable = async () => {
    getAllRecordForSpecificSchool().then((res) => {
      console.log("ALL FETCHED SCHOOL DATA", res.data.data);
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
    setEditBookData(bookData);
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
    if (item.school_name) {
      if (item.school_name.toLowerCase().replace(/\s/g, "").includes(searchQuery.toLowerCase().replace(/\s/g, ""))) {
        return item;
      }
    }
  });

  //* FILTER BY RANGE
  useEffect(() => {
    const filteredByRange = dataToFilterFrom.filter((item) => {
      if (rangeValue[0] <= item.maxCapacity && item.maxCapacity <= rangeValue[1]) {
        return item;
      }
    });

    setTableData(filteredByRange);
  }, [rangeValue]);

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
      console.log("DELETED RECORD", res);
      setTableData(tableData.filter((book) => book._id !== recordId));
      toast.success("Class Deleted Successfully");
    });
  };

  // * EXPORT TABLE LOGIC STARTS HERE
  const exportExcelHandler = () => {
    const option = [
      {
        label: "Name",
        value: "school_name",
      },
      {
        label: "Type",
        value: "school_type",
      },
      {
        label: "Package",
        value: "school_package",
      },
      {
        label: "Status",
        value: "account_status",
      },
      {
        label: "Renewal Date",
        value: "school_package_renewal_date",
      },
      {
        label: "Phone no.",
        value: "school_phone",
      },
      {
        label: "Principal",
        value: "principal_name",
      },
    ];
    excelExport(option, tableData);
  };

  const exportPdfHandler = () => {
    const columnArray = ["Name", "Type", "Package", "Status", "Renewal Date", "Phone no.", "Principal"];
    const option = ["school_name", "school_type", "school_package", "account_status", "school_package_renewal_date", "school_phone", "principal_name"];
    pdfExport("portrait", "All School Branch", columnArray, option, tableData);
  };

  const printTableHandler = () => {
    const columnArray = ["Name", "Type", "Package", "Status", "Renewal Date", "Phone no.", "Principal"];
    const option = ["school_name", "school_type", "school_package", "account_status", "school_package_renewal_date", "school_phone", "principal_name"];
    printTable("portrait", "All School Branch", columnArray, option, tableData);
  };

  return (
    <div>
      {/* //! ADD Record MODEL  */}
      <Transition appear show={isOpenAddBookModel} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeAddModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Add Branch
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
                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Edit Branch
                  </Dialog.Title>
                  <EditForm closeEditModalHandler={closeEditModal} fetchRecordAndSetTable={fetchRecordAndSetTable} setInitialFormData={setEditBookData} initialFormData={editBookData} />
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
            Add Admin
          </button>
        </div>

        <div className='overflow-auto rounded-lg shadow '>
          <PDFExport ref={pdfExportComponent} paperSize='A4' fileName='class_report.pdf' landscape={true} margin={{ top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" }}>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <th className='p-3'>Actions</th>
                  <th className='p-3'>Admin Image</th>
                  <th className='p-3'>Name</th>
                  <th className='p-3'>Email</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-100'>
                {paginatedData.map((item, index) => (
                  <tr className='bg-white' key={index}>
                    <td className='p-3 text-sm text-gray-500 whitespace-nowrap'>
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

                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      {item.image ? (
                        <img
                          style={{
                            height: "2rem",
                          }}
                          className='rounded cursor-pointer'
                          src={`${globalConstant.serverURL}/storage/${item.schoolUniqueId}/${item.image}`}
                          alt='School Logo'
                        />
                      ) : (
                        <img className='rounded cursor-pointer w-12' src='https://i.ibb.co/vVnqvfJ/sss.jpg' alt='Dummy Image' />
                      )}
                    </td>
                    <td className='p-3 text-sm font-bold text-gray-400 intel_400 whitespace-nowrap uppercase'>{item.school_name ? item.school_name : "N/A"}</td>
                    <td className='p-3 text-sm text-gray-500 whitespace-nowrap '>
                      <center>{item.school_email ? item.school_email : "N/A"}</center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
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
    </div>
  );
};

export default ManageGallery;
