//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/reviewProductApi";
import MultiSelect from "@/components/ReactSelect/MultiSelect";
import { getDataByValue } from "services/LocalStorageService";
import { useDeleteRecordMutation, useGetAllRecordForSpecificSchoolMutation } from "app/GlobalRedux/API/reviewCategoryApi";

const AddForm = ({ fetchBookAndSetTableData, closeAddModalHandler }) => {
  const [getAllRecordForSpecificSchool, { data: allRecordData, error: isFetchAllRecordDataError, isLoading: isAllRecordFetchingLoading }] = useGetAllRecordForSpecificSchoolMutation();

  const [options, setOptions] = useState([]);

  const fetchRecordAndSetTable = async () => {
    getAllRecordForSpecificSchool().then((res) => {
      console.log(res.data.data, "res.data.data");
      //  res.data.data has below format
      //   [
      //     {
      //
      //
      //         "name": "Electronics",
      //
      //     }
      // ]

      // i want it for options tag format

      let options = res.data.data.map((item) => {
        return { value: item._id, label: item.name };
      });

      setOptions(options);
    });
  };

  useEffect(() => {
    fetchRecordAndSetTable();
  }, []);

  const [postAddBookMutation, { data, error, isLoading }] = usePostAddRecordMutation();
  const [vehicleTypeOptions, setCategoryOptions] = useState(["ownership", "contract", "hired", "leased", "rented", "others"]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState(["petrol", "diesel", "electric", "hybrid", "cng"]);
  const [formData, setFormData] = useState(new FormData());
  const [allSelectedProductOptions, setAllSelectedProductOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (Array.isArray(value)) {
      return;
    }
    if (name === "coverImage") {
      formData.append(name, files[0]);
    } else {
      formData.set(name, value);
    }
  };

  const handleSubmit = async () => {
    if (!formData.get("productCategory")) {
      // set 1st option as default
      formData.set("productCategory", options[0].label);
    }

    try {
      const response = await postAddBookMutation(formData);

      if (response.data.success) {
        toast.success("Record added successfully");
      }

      fetchBookAndSetTableData();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
    closeAddModalHandler();
  };

  //  fetch from localhost:5000/api/v1/reviewProduct/get-all-for-school

  return (
    <>
      <div className='flex flex-wrap items-end -mx-3'>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Product Name <span className='text-red-500'>*</span>
          </label>
          <input autoComplete='off' name='name' onChange={handleInputChange} type='text' className='w-full mb-3 rounded-md' />
        </div>
      </div>

      <label className='block text-sm font-medium text-gray-700 mt-4'>Description</label>
      <textarea autoComplete='off' name='description' onChange={handleInputChange} type='text' className='w-full p-3 rounded-md' placeholder='Enter description...' />

      <label className='block text-sm font-medium text-gray-700 mt-4'>Product Category</label>
      {/* options */}
      <select name='productCategory' onChange={handleInputChange} className='w-full mb-3 rounded-md'>
        {options.map((item) => (
          <option value={item.label}>{item.label}</option>
        ))}
      </select>

      <label className='block text-sm font-medium text-gray-700 mt-4'>Attachment Document</label>
      <input autoComplete='off' name='coverImage' onChange={handleInputChange} type='file' className='w-full mb-3 rounded-md' />

      <div className='mt-4'>
        <button onClick={handleSubmit} type='button' className='inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white p-2 rounded'>
          Add
        </button>
        <button type='button' className='inline-flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white p-2 rounded ml-2' onClick={closeAddModalHandler}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddForm;
