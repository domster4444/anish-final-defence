//@ts-nocheck
import { useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/schoolApi";

const AddForm = ({ fetchRecordAndSetTable, closeAddModalHandler }) => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const [postAddRecordMutation, { data, error, isLoading }] = usePostAddRecordMutation();

  //* -------------------- SELECT  SECTION OPTIONS starts here --------------------
  const [allSelectedOptions, setAllSelectedOptions] = useState([]);

  //* -------------------- SELECT  SECTION OPTIONS ends here --------------------

  const [formData, setFormData] = useState(new FormData()); // Create a FormData object

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (Array.isArray(value)) {
      return;
    }
    if (name === "schoolLogo") {
      formData.append("schoolLogo", files[0]);
    } else if (name === "principalSignature") {
      formData.append("principalSignature", files[0]);
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
      console.error("Error fetching data:", error);
      toast.error(error.message);
    }
    closeAddModalHandler();
  };

  return (
    <>
      <div className='flex flex-wrap -mx-3'>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Name
          </label>
          <input name='school_name' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter  name' />
        </div>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Image
          </label>
          <input
            name='schoolLogo'
            onChange={handleInputChange}
            type='file'
            className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400'
          />
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Unique Id
          </label>
          <input
            name='schoolUniqueId'
            onChange={handleInputChange}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter unique id'
          />
        </div>
      </div>

      <div className='flex flex-wrap -mx-3'>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Admin Email
          </label>
          <input name='school_email' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter email' />
        </div>

        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-password'>
            Admin Password
          </label>
          <input
            name='password'
            onChange={handleInputChange}
            autoComplete='off'
            className='appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='password'
            placeholder='******************'
          />
        </div>
      </div>

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
