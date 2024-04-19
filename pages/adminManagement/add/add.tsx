//@ts-nocheck
import { useState } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "constant/constant";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/schoolApi";

const AddBranch: React.FC = () => {
  const [formData, setFormData] = useState(new FormData()); // Create a FormData object

  const [registerSchool, { isLoading }] = usePostAddRecordMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ! BELOW FIELDS SHOULD NOT BE EMPTY

    if (!formData.has("school_email")) {
      toast.error("school_email field is required");
      return;
    }

    if (!formData.has("schoolUniqueId")) {
      toast.error("schoolUniqueId field is required");
      return;
    }

    if (!formData.has("school_name")) {
      toast.error("school_name field is required");
      return;
    }

    if (!formData.has("school_package") || formData.get("school_package") === "") {
      toast.error("school_package field is required");
      return;
    }

    if (!formData.has("account_status") || formData.get("account_status") === "") {
      toast.error("account status field is required");
      return;
    }

    if (!formData.has("school_package_renewal_date")) {
      toast.error("school_package_renewal_date field is required");
      return;
    }

    if (!formData.has("school_phone")) {
      toast.error("school_phone field is required");
      return;
    }

    if (!formData.has("school_location")) {
      toast.error("school_location field is required");
      return;
    }

    if (!formData.has("school_type") || formData.get("school_type") === "") {
      toast.error("school_type field is required");
      return;
    }

    if (!formData.has("principal_name")) {
      toast.error("principal_name field is required");
      return;
    }

    if (!formData.has("contact_email")) {
      toast.error("contact_email field is required");
      return;
    }

    if (!formData.has("contact_phone")) {
      toast.error("contact_phone field is required");
      return;
    }

    if (!formData.has("website")) {
      toast.error("website field is required");
      return;
    }

    if (!formData.has("street")) {
      toast.error("street field is required");
      return;
    }

    if (!formData.has("city")) {
      toast.error("city field is required");
      return;
    }

    if (!formData.has("state")) {
      toast.error("state field is required");
      return;
    }

    if (!formData.has("postal_code")) {
      toast.error("postal_code field is required");
      return;
    }

    try {
      const response = await registerSchool(formData);
      if (response.error) {
        throw new Error(response.error.data.message);
      }
      toast.success("Added Successfully");
      console.log(response);

      // ! RESET FORM DATA
      // simply refresh the page
      // window.location.reload();
      // ! RESET FORM DATA
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardOutline pageTitle='Add Librarian' isShowRightSection={true}>
      <>
        <form className='w-full bg-white rounded-lg p-10'>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Branch Name
              </label>
              <input
                name='school_name'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='Enter branch name'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Branch Image
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
          </div>
          <div className='flex flex-wrap -mx-3 mt-1 '>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                School Unique Id
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
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Account Status
              </label>

              <select name='account_status' onChange={handleInputChange} className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>
                {/* default choose nothing */}
                <option value=''>Choose account status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                <option value='pending'>Pending</option>
              </select>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mt-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                School Package
              </label>

              <select name='school_package' onChange={handleInputChange} className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>
                <option value=''>Choose account package</option>
                <option value='standard'>Standard</option>
                <option value='ultimate'>Ultimate</option>
                <option value='premium'>Premium</option>
              </select>
            </div>
            <div className='w-full md:w-1/2 px-3 mt-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                School Package Renewal Date
              </label>
              <input
                name='school_package_renewal_date'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='date'
                placeholder='Enter package renewal date'
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                School Phone
              </label>
              <input
                name='school_phone'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='Enter school phone number'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Principal Signature
              </label>
              <input
                name='principalSignature'
                onChange={handleInputChange}
                type='file'
                className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400'
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                School Location
              </label>
              <input
                name='school_location'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='Enter school location'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                School Type
              </label>

              <select name='school_type' onChange={handleInputChange} className='block w-full mt-2 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>
                {/* default choose nothing */}
                <option value=''>Choose account type</option>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mt-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Principal Name
              </label>
              <input
                name='principal_name'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='Enter principal name'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Contact Email
              </label>
              <input name='contact_email' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Contact email' />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Contact Ph no.
              </label>
              <input
                name='contact_phone'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='Enter contact phone no.'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Website
              </label>
              <input
                name='website'
                onChange={handleInputChange}
                autoComplete='off'
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='Enter school website url'
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Street
              </label>
              <input name='street' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter street' />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                City
              </label>
              <input name='city' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter city' />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                State
              </label>
              <input name='state' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter state' />
            </div>
            <div className='w-full md:w-1/2 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Postal Code
              </label>
              <input name='postal_code' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter postal code' />
            </div>
          </div>

          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Branch Admin Email
              </label>
              <input name='school_email' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter email' />
            </div>

            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-password'>
                Branch Admin Password
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
              <p className='text-gray-600 text-xs italic'>Make it as long and as crazy as you'd like</p>
            </div>
          </div>

          <button onClick={handleSubmit} className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded '>
            Create Branch
          </button>
        </form>
      </>
    </DashboardOutline>
  );
};

export default AddBranch;
