//@ts-nocheck
"use client";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { usePatchUpdateRecordMutation } from "app/GlobalRedux/API/reviewProductApi";

const EditBookForm = ({ setInitialFormData, initialFormData, fetchBookAndSetTableData, closeEditModalHandler }) => {
  const [formData, setFormData] = useState(new FormData()); // Create a FormData object
  const [patchUpdate, { data: updateData, error: updateError, isLoading: updateIsLoading }] = usePatchUpdateRecordMutation();
  const [vehicleTypeOptions, setCategoryOptions] = useState(["ownership", "contract", "hired", "leased", "rented", "others"]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState(["petrol", "diesel", "electric", "hybrid", "cng"]);

  useEffect(() => {
    if (initialFormData) {
    }
  }, [initialFormData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (Array.isArray(value)) {
      return;
    }

    if (name === "image") {
      formData.append(name, files[0]);
    } else {
      formData.set(name, value);
    }
  };

  const handleSubmit = async () => {
    try {
      const patchUpdateData = await patchUpdate({
        bookId: initialFormData._id,
        formData: formData,
      }).unwrap();

      console.log(patchUpdateData.data);
      toast.success("Book updated successfully");
      fetchBookAndSetTableData();
    } catch (error) {
      console.log(error.message);
      toast.error("Error Occured while updating");
    }
    closeEditModalHandler();
  };

  return (
    <>
      {/* 
name='title'
        value={initialFormData?.title}
        onChange={(e) => {
          handleInputChange(e);
          setInitialFormData({ ...initialFormData, title: e.target.value });
        }} */}

      <div className='flex flex-wrap items-end -mx-3'>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700 mt-4'>Bus Code</label>
          <input
            autoComplete='off'
            name='busCode'
            value={initialFormData?.busCode}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, busCode: e.target.value });
            }}
            type='text'
            className='w-full mb-3 rounded-md'
          />
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Vehicle Number <span className='text-red-500'>*</span>
          </label>
          <input
            autoComplete='off'
            name='name'
            value={initialFormData?.name}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, name: e.target.value });
            }}
            type='text'
            className='w-full mb-3 rounded-md'
          />
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>Register Number</label>
          <input
            autoComplete='off'
            name='registerNumber'
            value={initialFormData?.registerNumber}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, registerNumber: e.target.value });
            }}
            type='text'
            className='w-full mb-3 rounded-md'
          />
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>
            No Of Seats <span className='text-red-500'>*</span>
          </label>
          <input
            autoComplete='off'
            name='noOfSeats'
            value={initialFormData?.noOfSeats}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, noOfSeats: e.target.value });
            }}
            type='text'
            className='w-full mb-3 rounded-md'
          />
        </div>
      </div>

      <div className='flex flex-wrap items-start -mx-3'>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Maximum People Allowed <span className='text-red-500'>*</span>
          </label>
          <input
            autoComplete='off'
            name='maximumAllowed'
            value={initialFormData?.maximumAllowed}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, maximumAllowed: e.target.value });
            }}
            type='text'
            className='w-full  rounded-md'
          />
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Vehicle Type <span className='text-red-500'>*</span>
          </label>
          <select
            name='vehicleType'
            value={initialFormData?.vehicleType}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, vehicleType: e.target.value });
            }}
            className='w-full rounded-md'
          >
            <option defaultChecked value={null}>
              none
            </option>
            {vehicleTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Fuel Type <span className='text-red-500'>*</span>
          </label>
          <select
            name='fuelType'
            value={initialFormData?.fuelType}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, fuelType: e.target.value });
            }}
            className='w-full rounded-md'
          >
            <option defaultChecked value={null}>
              none
            </option>
            {fuelTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block text-sm font-medium text-gray-700 '>
            Contact Person <span className='text-red-500'>*</span>
          </label>
          <input
            autoComplete='off'
            name='contactPerson'
            value={initialFormData?.contactPerson}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, contactPerson: e.target.value });
            }}
            type='text'
            className='w-full rounded-md'
          />
        </div>
      </div>

      <label className='block text-sm font-medium text-gray-700 mt-4'>Description</label>
      <textarea
        autoComplete='off'
        name='description'
        value={initialFormData?.description}
        onChange={(e) => {
          handleInputChange(e);
          setInitialFormData({ ...initialFormData, description: e.target.value });
        }}
        type='text'
        className='w-full p-3 rounded-md'
        placeholder='Enter description...'
      />
      <label className='block text-sm font-medium text-gray-700 mt-1'>Insurance Renewal Date</label>
      <input
        autoComplete='off'
        name='insuranceRenewalDate'
        value={initialFormData?.insuranceRenewalDate.split("T")[0]}
        onChange={(e) => {
          handleInputChange(e);
          setInitialFormData({ ...initialFormData, insuranceRenewalDate: e.target.value });
        }}
        type='date'
        className='w-full rounded-md'
      />

      <label className='block text-sm font-medium text-gray-700 mt-4'>Attachment Document</label>
      <input
        autoComplete='off'
        name='coverImage'
        onChange={(e) => {
          handleInputChange(e);
          setInitialFormData({ ...initialFormData, title: e.target.value });
        }}
        type='file'
        className='w-full mb-3 rounded-md'
      />

      <div className='mt-4'>
        <button onClick={handleSubmit} type='button' className='inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white p-2 rounded'>
          Update
        </button>
        <button onClick={closeEditModalHandler} type='button' className='inline-flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white p-2 rounded ml-2'>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditBookForm;
