//@ts-nocheck
import ReactStars from "react-rating-stars-component";
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
import { useGetAllRecordForSpecificSchoolMutation as getProductsMutation } from "app/GlobalRedux/API/reviewProductApi";

import "./productListStyles.css";
import { globalConstant } from "constant/constant";

const ProductList = () => {
  const [productDescription, setProductDescription] = useState("");
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  console.log("loggedInUserData", loggedInUserData);

  const [getAllRecordForSpecificSchool, { data: allRecordData, error: isFetchAllRecordDataError, isLoading: isAllRecordFetchingLoading }] = useGetAllRecordForSpecificSchoolMutation();
  const [deleteRecord, { data: deleteRecordData, error: isDeleteRecordError, isLoading: isDeleteRecordLoading }] = useDeleteRecordMutation();

  const [getProducts, { data: allProductData }] = getProductsMutation();

  const [reviewProducts, setReviewProducts] = useState([]);

  const fetchBookAndSetTableData = async () => {
    getProducts().then((res) => {
      console.log(res.data.data);
      setReviewProducts(res.data.data);
    });
  };

  useEffect(() => {
    fetchBookAndSetTableData();
  }, []);

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

  const submitHandler = (productId, rating, description) => {
    alert("submitHandler clicked");
  };

  return (
    <DashboardOutline pageTitle={"Review Category"} isShowRightSection={true}>
      {
        // reviewProducts each item has below info
        //   {
        //     "_id": "661c42498edf253809a97dd4",

        //     "name": "Dell vostro",
        //     "productCategory": "Laptops",
        //     "description": "Laptop of dell",
        //     "attachment": "1713128009127.png",
        // }

        reviewProducts &&
          reviewProducts.map((product, index) => (
            <div key={index} class='style-43'>
              <div class='style-46'>
                <div class='style-47'>
                  <picture class='style-48'>
                    <img class='style-51' src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${product.attachment}`} alt='' />
                  </picture>
                </div>
                <div class='style-52'>
                  <p class='style-53'>{product.name}</p>
                  <div class='style-54'>
                    <p class='style-57'>
                      <span class='style-58'>
                        <span class='style-59'>TrustScore</span> 5.0
                      </span>
                      <span class='style-60'>|</span>18,685 reviews
                    </p>
                  </div>
                  <div>
                    <span class='style-58'>
                      <span class='style-59'>{product.description}</span> 5.0
                    </span>
                  </div>

                  <>
                    <ReviewForm userId={loggedInUserData.accountId} productId={product._id} />
                  </>
                  <div class='style-61'></div>
                </div>
              </div>

              <div class='style-62'>
                <div class='style-63'>
                  <span class='style-64'>{product.productCategory}</span>
                  <span class='style-65'>·</span>
                  <span class='style-66'>Hobby Store</span>
                  <span class='style-67'>·</span>
                  <span class='style-68'>Promotional Item Store</span>
                  <span class='style-69'>·</span>
                  <span class='style-70'>Gift Shop</span>
                  <span class='style-71'>·</span>
                  <span class='style-72'>Business to Business Service</span>
                  <span class='style-73'>·</span>
                  <span class='style-74'>Drives and Storage Service</span>
                </div>

                <hr class='style-75' />

                <div class='style-76'>
                  <div class='style-77'>
                    <span class='style-78'>
                      <button class='style-79' aria-label='Contact'>
                        <svg viewBox='0 0 16 16' fill='currentColor' class='style-80' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M10.694 1.537c.217.281.415.592.593.923.321.6.59 1.287.793 2.04h1.983a7.027 7.027 0 0 0-3.37-2.963ZM14.54 5.5h-2.235c.143.789.22 1.63.22 2.5 0 .87-.077 1.711-.22 2.5h2.235c.297-.776.46-1.62.46-2.5 0-.88-.163-1.724-.46-2.5Zm-.476 6H12.08a9.655 9.655 0 0 1-.793 2.04 6.698 6.698 0 0 1-.593.923 7.027 7.027 0 0 0 3.37-2.963Zm-8.758 2.963a6.708 6.708 0 0 1-.593-.923 9.654 9.654 0 0 1-.792-2.04H1.936a7.027 7.027 0 0 0 3.37 2.963ZM1.46 10.5h2.236c-.144-.789-.22-1.63-.22-2.5 0-.87.076-1.711.22-2.5H1.46A6.984 6.984 0 0 0 1 8c0 .88.163 1.724.46 2.5Zm.476-6h1.985c.203-.753.47-1.44.792-2.04
                              .178-.331.376-.642.593-.923A7.027 7.027 0 0 0 1.936 4.5ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M5.595 2.933c-.247.46-.461.987-.635 1.567H7.5V1.075c-.677.204-1.35.822-1.905 1.858Zm4.81 0c.247.46.462.987.635 1.567H8.5V1.075c.677.204 1.35.822 1.906 1.858ZM8.5 5.5h2.787c.153.774.238 1.616.238 2.5 0 .884-.085 1.726-.238 2.5H8.5v-5Zm0 6h2.54a8.428 8.428 0 0 1-.634 1.567c-.557 1.036-1.229 1.654-1.906 1.858V11.5Zm-1 0v3.425c-.677-.204-1.35-.822-1.905-1.858A8.426 8.426 0 0 1 4.96 11.5H7.5Zm0-1H4.713A12.91 12.91 0 0 1 4.475 8c0-.884.085-1.726.238-2.5H7.5v5Z'
                            class='style-81'
                          ></path>
                        </svg>
                        <svg viewBox='0 0 16 16' fill='currentColor' class='style-82' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                          <path fill-rule='evenodd' clip-rule='evenodd' d='M0 2.5h16v11H0v-11Zm1.789 1L8 9.173 14.211 3.5H1.79ZM15 4.134l-7 6.393-7-6.393V12.5h14V4.134Z' class='style-83'></path>
                        </svg>
                      </button>
                    </span>
                    <div class='style-84'>
                      <span class='style-85'>Computer Accessories Store</span>
                      <span class='style-86'>·</span>
                      <span class='style-87'>Hobby Store</span>
                      <span class='style-88'>·</span>
                      <span class='style-89'>Promotional Item Store</span>
                      <span class='style-90'>·</span>
                      <span class='style-91'>Gift Shop</span>
                      <span class='style-92'>·</span>
                      <span class='style-93'>Business to Business Service</span>
                      <span class='style-94'>·</span>
                      <span class='style-95'>Drives and Storage Service</span>
                    </div>
                    <button class='style-96' aria-expanded='false' aria-controls='latest-reviews-4bdc9828000064000505dc60-panel' data-recent-reviews-toggle-button='true'>
                      Latest reviews&nbsp;
                      <svg viewBox='0 0 16 16' fill='currentColor' class='style-97' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                        <path fill-rule='evenodd' clip-rule='evenodd' d='m8.003 10.289 5.617-6.557.76.65-6.377 7.444L1.62 4.383l.76-.651 5.623 6.557Z' class='style-98'></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class='style-99' aria-hidden='true'>
                  <div class='style-100'>
                    <div class='style-101'>
                      <div class='style-102'>
                        <div class='style-103'>
                          <div class='style-104'></div>
                          <div class='style-105'>
                            <div class='style-106'></div>
                            <div class='style-107'>
                              <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-108' />
                            </div>
                          </div>
                          <div class='style-109'></div>
                          <div class='style-110'></div>
                          <div class='style-111'></div>
                          <div class='style-112'></div>
                        </div>
                      </div>
                      <div class='style-113'>
                        <div class='style-114'>
                          <div class='style-115'></div>
                          <div class='style-116'>
                            <div class='style-117'></div>
                            <div class='style-118'>
                              <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-119' />
                            </div>
                          </div>
                          <div class='style-120'></div>
                          <div class='style-121'></div>
                          <div class='style-122'></div>
                          <div class='style-123'></div>
                        </div>
                      </div>
                      <div class='style-124'>
                        <div class='style-125'>
                          <div class='style-126'></div>
                          <div class='style-127'>
                            <div class='style-128'></div>
                            <div class='style-129'>
                              <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-130' />
                            </div>
                          </div>
                          <div class='style-131'></div>
                          <div class='style-132'></div>
                          <div class='style-133'></div>
                          <div class='style-134'></div>
                        </div>
                      </div>
                      <div class='style-135'>
                        <div class='style-136'>
                          <div class='style-137'></div>
                          <div class='style-138'>
                            <div class='style-139'></div>
                            <div class='style-140'>
                              <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-141' />
                            </div>
                          </div>
                          <div class='style-142'></div>
                          <div class='style-143'></div>
                          <div class='style-144'></div>
                          <div class='style-145'></div>
                        </div>
                      </div>
                      <div class='style-146'>
                        <div class='style-147'>
                          <div class='style-148'></div>
                          <div class='style-149'>
                            <div class='style-150'></div>
                            <div class='style-151'>
                              <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-152' />
                            </div>
                          </div>
                          <div class='style-153'></div>
                          <div class='style-154'></div>
                          <div class='style-155'></div>
                          <div class='style-156'></div>
                        </div>
                      </div>
                      <div class='style-157'>
                        <div class='style-158'>
                          <div class='style-159'></div>
                          <div class='style-160'>
                            <div class='style-161'></div>
                            <div class='style-162'>
                              <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-163' />
                            </div>
                          </div>
                          <div class='style-164'></div>
                          <div class='style-165'></div>
                          <div class='style-166'></div>
                          <div class='style-167'></div>
                        </div>

                        <div class='style-168'>
                          <div class='style-169'>
                            <div class='style-170'></div>
                            <div class='style-171'>
                              <div class='style-172'></div>
                              <div class='style-173'>
                                <img alt='' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-0.svg' class='style-174' />
                              </div>
                            </div>
                            <div class='style-175'></div>
                            <div class='style-176'></div>
                            <div class='style-177'></div>
                            <div class='style-178'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
      }
    </DashboardOutline>
  );
};

export default ProductList;

// functional component with  <>
// <ReactStars count={5} onChange={ratingChanged} size={24} activeColor='#ffd700' />
// <textarea autoComplete='off' name='description' type='text' className='w-full p-3 rounded-md' placeholder='Enter review...' />

// <button onClick={() => submitHandler(product._id, 5, "description")} className='btn btn-primary bg-blue-500 text-white p-2 rounded'>
//   Submit Review
// </button>
// </>

import { usePostAddRecordMutation as postRating } from "app/GlobalRedux/API/userRatingApi";

const ReviewForm = ({ userId, productId }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  let product_id = productId;
  let user_id = userId;

  const [postRatingFunc, { data: allRatingPostedData }] = postRating();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const submitHandler = () => {
    console.log("userId", user_id);
    console.log("productId", product_id);
    console.log("rating", rating);
    console.log("description", description);

    postRatingFunc({
      userId: user_id,
      productId: product_id,
      rate: rating,
      description: description,
    }).then((res) => {
      console.log("res", res);
      toast.success("Review Submitted Successfully");
    });
  };

  return (
    <>
      <ReactStars count={5} onChange={ratingChanged} size={24} activeColor='#ffd700' />
      <textarea onChange={(e) => setDescription(e.target.value)} value={description} autoComplete='off' name='description' type='text' className='w-full p-3 rounded-md' placeholder='Enter review...' />

      <button onClick={() => submitHandler()} className='btn btn-primary bg-blue-500 text-white p-2 rounded'>
        Submit Review
      </button>
    </>
  );
};
