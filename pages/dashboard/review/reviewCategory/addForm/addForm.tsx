//@ts-nocheck
import { useState } from "react";
import { toast } from "react-toastify";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/reviewCategoryApi";

const AddForm = ({ fetchRecordAndSetTable, closeAddModalHandler }) => {
  const [postAddRecordMutation, { data, error, isLoading }] = usePostAddRecordMutation();

  const [formData, setFormData] = useState(new FormData()); // Create a FormData object

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
      const response = await postAddRecordMutation(formData);

      if (response.error) {
        throw new Error(response.error.data.message);
      }

      fetchRecordAndSetTable();
      toast.success("Added Successfully");
    } catch (error) {
      toast.error(error.message);
    }

    setFormData(new FormData());
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((inputField) => {
      inputField.value = "";
    });

    closeAddModalHandler();
  };

  return (
    <>
      <label className='block text-sm font-medium text-gray-700 mt-4'>
        Review Category Name <span className='text-red-500'>*</span>
      </label>
      <input autoComplete='off' name='name' onChange={handleInputChange} type='text' className='w-full p-3 mb-3 rounded-md' placeholder='Enter Review Category Name' />
      <label className='block text-sm font-medium text-gray-700 mt-4'>Description</label>
      <textarea autoComplete='off' name='description' onChange={handleInputChange} type='text' className='w-full p-3 mb-3 rounded-md' placeholder='Enter description...' />

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
