//@ts-nocheck
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { usePatchUpdateRecordMutation } from "app/GlobalRedux/API/schoolApi";

const EditBookForm = ({ setInitialFormData, initialFormData, fetchRecordAndSetTable, closeEditModalHandler }) => {
  const [formData, setFormData] = useState(new FormData()); // Create a FormData object
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const [patchUpdate, { data: updateData, error: updateError, isLoading: updateIsLoading }] = usePatchUpdateRecordMutation();

  useEffect(() => {
    if (initialFormData) {
    }
  }, [initialFormData]);

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
      await patchUpdate({
        id: initialFormData._id,
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

  // name='name'
  // value={initialFormData?.name}
  // onChange={(e) => {
  //   handleInputChange(e);
  //   setInitialFormData({ ...initialFormData, name: e.target.value });
  // }}
  return (
    <>
      <div className='flex flex-wrap -mx-3'>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Branch Name
          </label>
          <input
            name='school_name'
            value={initialFormData?.school_name}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_name: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter branch name'
          />
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            School Unique Id
          </label>
          <input
            name='schoolUniqueId'
            value={initialFormData?.schoolUniqueId}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, schoolUniqueId: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter unique id'
          />
        </div>

        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Account Status
          </label>

          <select
            name='account_status'
            value={initialFormData?.account_status}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, account_status: e.target.value });
            }}
            className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
          >
            <option value=''>Choose account status</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
            <option value='pending'>Pending</option>
          </select>
        </div>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Branch Image
          </label>
          <input
            name='schoolLogo'
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, image: e.target.value });
            }}
            type='file'
            className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400'
          />
        </div>
      </div>

      <div className='flex flex-wrap -mx-3 mt-3'>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            School Package
          </label>

          <select
            name='school_package'
            value={initialFormData?.school_package}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_package: e.target.value });
            }}
            className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
          >
            <option value=''>Choose account package</option>
            <option value='standard'>Standard</option>
            <option value='ultimate'>Ultimate</option>
            <option value='premium'>Premium</option>
          </select>
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Renewal Date
          </label>
          <input
            name='school_package_renewal_date'
            value={initialFormData?.school_package_renewal_date}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_package_renewal_date: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='date'
            placeholder='Enter package renewal date'
          />
        </div>

        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            School Phone
          </label>
          <input
            name='school_phone'
            value={initialFormData?.school_phone}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_phone: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter school phone number'
          />
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            School Location
          </label>
          <input
            name='school_location'
            value={initialFormData?.school_location}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_location: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter school location'
          />
        </div>
      </div>

      <div className='flex flex-wrap -mx-3'>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            School Type
          </label>

          <select
            name='school_type'
            value={initialFormData?.school_type}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_type: e.target.value });
            }}
            className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
          >
            <option value=''>Choose account type</option>
            <option value='public'>Public</option>
            <option value='private'>Private</option>
          </select>
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Principal Name
          </label>
          <input
            name='principal_name'
            value={initialFormData?.principal_name}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, principal_name: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter principal name'
          />
        </div>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Contact Email
          </label>
          <input
            name='contact_email'
            value={initialFormData?.contact_email}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, contact_email: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Contact email'
          />
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Contact Ph no.
          </label>
          <input
            name='contact_phone'
            value={initialFormData?.contact_phone}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, contact_phone: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter contact phone no.'
          />
        </div>
      </div>

      <div className='flex flex-wrap -mx-3'>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Website
          </label>
          <input
            name='website'
            value={initialFormData?.website}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, website: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter school website url'
          />
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Street
          </label>
          <input
            name='street'
            value={initialFormData?.street}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, street: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter street'
          />
        </div>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            City
          </label>
          <input
            name='city'
            value={initialFormData?.city}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, city: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter city'
          />
        </div>
        <div className='w-full md:w-1/4 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            State
          </label>
          <input
            name='state'
            value={initialFormData?.state}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, state: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter state'
          />
        </div>
      </div>

      <div className='flex flex-wrap -mx-3'>
        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Postal Code
          </label>
          <input
            name='postal_code'
            value={initialFormData?.postal_code}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, postal_code: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter postal code'
          />
        </div>

        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Principal Signature
          </label>
          <input
            name='principalSignature'
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, principalSignature: e.target.value });
            }}
            type='file'
            className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400'
          />
        </div>

        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Branch Admin Email
          </label>
          <input
            name='school_email'
            value={initialFormData?.school_email}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, school_email: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter email'
          />
        </div>

        <div className='w-full md:w-1/4 px-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-password'>
            Branch Admin Password
          </label>
          <input
            name='password'
            value={initialFormData?.password}
            onChange={(e) => {
              handleInputChange(e);
              setInitialFormData({ ...initialFormData, password: e.target.value });
            }}
            autoComplete='off'
            className='appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-password'
            type='password'
            placeholder='******************'
          />
          <p className='text-gray-600 text-xs italic'>Make it as long and as crazy as you'd like</p>
        </div>
      </div>
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
