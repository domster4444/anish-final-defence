//@ts-nocheck
import { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { globalConstant } from "constant/constant";
import { Dialog, Transition } from "@headlessui/react";

import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { useGetAllSchoolStaffOfParticularSchoolMutation, useDeleteSchoolStaffMutation } from "app/GlobalRedux/API/schoolUserAuthApi";
import { IdCardGenerator } from "@/components/IdCardGenerator/IdCardGenerator";
import { excelExport, pdfExport, printTable } from "lib/utilities/utilityFunctions/exportTable";

const ManageGallery = () => {
  const router = useRouter();
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const [deleteRecord, { data: deleteBookData, error: deleteBookError, isLoading: isDeleteBookFetchingLoading }] = useDeleteSchoolStaffMutation();
  const [getAllSchoolStaff, { loading: isGetAllUserOfSchool }] = useGetAllSchoolStaffOfParticularSchoolMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [editBookData, setEditBookData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchBookAndSetTableData = async () => {
    await getAllSchoolStaff().then((res) => {
      // setTableData(res.data.data);
      // all data with role "canteen staff"
      setTableData(res.data.data.filter((item) => item.role === "librarian"));

      console.log(res.data.data);
    });
  };

  useEffect(() => {
    fetchBookAndSetTableData();
  }, []);

  //* edit modal starts here
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenHolderModel, setIsOpenHolderModel] = useState(false);

  function closeEditModal() {
    setIsOpen(false);
  }

  function openEditModal(bookData) {
    setEditBookData(bookData);
    setIsOpen(true);
  }

  function closeHolderBookModal() {
    setIsOpenHolderModel(false);
  }

  const filteredData = tableData.filter((item) => {
    const includesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return includesSearchQuery;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleBookSelect = (isbn) => {
    if (selectedBooks.includes(isbn)) {
      setSelectedBooks(selectedBooks.filter((selectedIsbn) => selectedIsbn !== isbn));
    } else {
      setSelectedBooks([...selectedBooks, isbn]);
    }
  };
  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const deleteRecordHandler = (id) => {
    deleteRecord({
      userId: id,
    }).then((res) => {
      setTableData(tableData.filter((item) => item._id !== id));
      toast.success("Record Deleted Successfully");
    });
  };

  // * EXPORT TABLE LOGIC STARTS HERE
  const exportExcelHandler = () => {
    const option = [
      {
        label: "Id no",
        value: "idNo",
      },
      {
        label: "Name",
        value: "name",
      },
      {
        label: "Designation",
        value: "designation",
      },
      {
        label: "Department",
        value: "department",
      },
      {
        label: "Education",
        value: "education",
      },
      {
        label: "Phone Number",
        value: "phoneNumber",
      },
      {
        label: "Emergency Number",
        value: "emergencyNumber",
      },
      {
        label: "Gender",
        value: "gender",
      },

      {
        label: "Address",
        value: "address",
      },
      {
        label: "Permanent Address",
        value: "permanentAddress",
      },
      {
        label: "Email",
        value: "email",
      },

      {
        label: "Role",
        value: "role",
      },
      {
        label: "FatherName",
        value: "staffFatherName",
      },
      {
        label: "MotherName",
        value: "staffMotherName",
      },
      {
        label: "Marital Status",
        value: "maritalStatus",
      },
      {
        label: "Work Shift",
        value: "workShift",
      },
      {
        label: "Work Location",
        value: "workLocation",
      },
      {
        label: "Basic Salary",
        value: "basicSalary",
      },
      {
        label: "Medical Leave/Month",
        value: "medicalLeavePerMonth",
      },
      {
        label: "Casual Leave/Month",
        value: "casualLeavePerMonth",
      },
      {
        label: "Maternity Leave/Month",
        value: "maternityLeavePerMonth",
      },
      {
        label: "PanNumber",
        value: "staffPanNumber",
      },
      {
        label: "EPF Number",
        value: "epfNumber",
      },
      {
        label: "Bank Name",
        value: "bankName",
      },
      {
        label: "Bank Branch",
        value: "bankBranchName",
      },

      {
        label: "Account Title",
        value: "accountTitle",
      },
      {
        label: "Account Number",
        value: "accountNumber",
      },

      {
        label: "DOB",
        value: "staffDateOfBirth",
      },
      {
        label: "Experience",
        value: "staffNoOfExperience",
      },
      {
        label: "Joining Date",
        value: "staffJoiningDate",
      },
      {
        label: "Contract Type",
        value: "staffContractType",
      },
    ];

    excelExport(option, tableData);
  };

  const exportPdfHandler = () => {
    const columnArray = ["Name", "Designation", "Department", "Education", "Phone Number", "Emergency", "Gender", "Address", "Permanent Address"];
    const option = ["name", "designation", "department", "education", "phoneNumber", "emergencyNumber", "gender", "address", "permanentAddress"];
    pdfExport("landscape", "Canteen Staff", columnArray, option, tableData);
  };

  const printTableHandler = () => {
    const columnArray = ["Id no", "Name", "Designation", "Department", "Education", "Phone Number", "Emergency", "Gender", "Address", "Permanent Address"];
    const option = ["idNo", "name", "designation", "department", "education", "phoneNumber", "emergencyNumber", "gender", "address", "permanentAddress"];
    printTable("landscape", "Canteen Staff", columnArray, option, tableData);
  };

  return (
    <DashboardOutline pageTitle={"Manage Librarian"} isShowRightSection={true}>
      <div className='pb-5 px-1  bg-gray-100'>
        <input autoComplete='off' type='text' placeholder='Search by name...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-full p-3 mb-3 rounded-md' />

        <div className='overflow-auto rounded-lg shadow '>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <th className='p-3'>Actions</th>

                <th
                  style={{
                    minWidth: "85px",
                  }}
                >
                  <span className='text-gray-500 text-xs'>Image</span>
                </th>
                <th
                  style={{
                    minWidth: "85px",
                  }}
                >
                  <span className='text-gray-500 text-xs'>Email</span>
                </th>
                <th
                  style={{
                    minWidth: "85px",
                  }}
                >
                  <span className='text-gray-500 text-xs'>Password</span>
                </th>
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
                        <div
                          className='flex'
                          style={{
                            marginLeft: 0,
                          }}
                        ></div>
                        <div
                          className='flex'
                          style={{
                            marginLeft: 0,
                          }}
                        ></div>
                      </div>
                    </td>

                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      {item.image ? (
                        <img style={{ width: "50px", height: "50px" }} className='rounded cursor-pointer' src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${item.image}`} alt='School Book' />
                      ) : (
                        <img className='rounded cursor-pointer w-12' src='https://i.ibb.co/vVnqvfJ/sss.jpg' alt='Dummy Image' />
                      )}
                    </td>

                    <td className='p-3 text-sm font-bold text-stone-500  intel_400 whitespace-nowrap'>{item.email}</td>
                    <td className='p-3 text-sm text-stone-500  intel_400 whitespace-nowrap'>password</td>
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
