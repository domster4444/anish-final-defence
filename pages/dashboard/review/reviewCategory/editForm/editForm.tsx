//@ts-nocheck
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { usePatchUpdateRecordMutation } from "app/GlobalRedux/API/reviewCategoryApi";

const EditBookForm = ({ setInitialFormData, initialFormData, fetchRecordAndSetTable, closeEditModalHandler }) => {
  const [patchUpdate, { data: updateData, error: updateError, isLoading: updateIsLoading }] = usePatchUpdateRecordMutation();
  const [formData, setFormData] = useState(new FormData()); // Create a FormData object

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
    try {
      await patchUpdate({
        _id: initialFormData._id,
        formData,
      }).unwrap();
      toast.success("Record updated successfully");
      fetchRecordAndSetTable();
    } catch (error) {
      console.log(error.message);
      toast.error("Error Occured while updating");
    }
    closeEditModalHandler();
  };

  return (
    <>
      <label className='block text-sm font-medium text-gray-700 mt-4'>
        Review Category Name <span className='text-red-500'>*</span>
      </label>

      <input
        name='name'
        value={initialFormData?.name}
        onChange={(e) => {
          handleInputChange(e);
          setInitialFormData({ ...initialFormData, name: e.target.value });
        }}
        type='text'
        className='w-full p-3 mb-3 rounded-md'
      />
      <label className='block text-sm font-medium text-gray-700 mt-4'>Description</label>

      <textarea
        name='description'
        value={initialFormData?.description}
        onChange={(e) => {
          handleInputChange(e);
          setInitialFormData({ ...initialFormData, description: e.target.value });
        }}
        type='text'
        className='w-full p-3 mb-3 rounded-md'
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
