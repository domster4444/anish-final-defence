//@ts-nocheck

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MultiSelect from "@/components/ReactSelect/MultiSelect";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { usePostRegisterSchoolStaffMutation } from "app/GlobalRedux/API/schoolUserAuthApi";
import { useRouter } from "next/navigation";

const Add: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(new FormData()); // Create a FormData object
  const [registerStaff, { isLoading }] = usePostRegisterSchoolStaffMutation();
  const [userEmail, setUserEmail] = useState<string>("");
  const [allSelectedDesignationOption, setAllSelectedDesignationOption] = useState([]);
  const [allSelectedDepartmentOption, setAllSelectedDepartmentOption] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [staffContractType, setStaffContractType] = useState("temporary");
  const [role, setRole] = useState("librarian");
  const [gender, setGender] = useState("male");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (Array.isArray(value)) {
      return;
    }
    if (name === "image") {
      formData.append(name, files[0]);
    } else if (name === "resume") {
      formData.append(name, files[0]);
    } else if (name === "joiningLetter") {
      formData.append(name, files[0]);
    } else if (name === "resignationLetter") {
      formData.append(name, files[0]);
    } else if (name === "otherDocument") {
      formData.append(name, files[0]);
    } else {
      formData.set(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.set("designation", allSelectedDesignationOption.label);
    formData.set("department", allSelectedDepartmentOption.label);
    formData.set("email", userEmail);
    formData.set("role", role);
    formData.set("password", "password");
    formData.set("maritalStatus", maritalStatus);
    formData.set("staffContractType", staffContractType);
    formData.set("gender", gender);
    try {
      const response = await registerStaff(formData);
      if (response.error) {
        throw new Error(response.error.data.message);
      }
      toast.success("Added Successfully");
      router.push("/dashboard/user/userManagement/manage/manage");

      setFormData(new FormData());
      const inputFields = document.querySelectorAll("input");
      inputFields.forEach((inputField) => {
        inputField.value = "";
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <DashboardOutline pageTitle='Add Librarian' isShowRightSection={false}>
      <>
        <form className='w-full bg-white rounded-lg p-10'>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/3 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Name
                <span className='text-red-500'>*</span>
              </label>
              <input name='name' onChange={handleInputChange} autoComplete='off' className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Enter full name' />
            </div>
            <div className='w-full md:w-1/3 px-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold ' htmlFor='grid-first-name'>
                Email
                <span className='text-red-500'>*</span>
              </label>
              <input
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                autoComplete='off'
                className='appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-email'
                type='email'
                placeholder='Enter email address'
              />
            </div>
            <div className='w-full md:w-1/3 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Password
                <span className='text-red-500'>*</span>
              </label>
              <input
                name='password'
                onChange={handleInputChange}
                disabled
                value='password'
                autoComplete='off'
                className='appearance-none block w-full  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='text'
                placeholder='password'
              />
            </div>
          </div>

          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/3 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                Image
              </label>
              <input
                name='image'
                onChange={handleInputChange}
                type='file'
                className='block w-full mt-6 border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400'
              />
            </div>
          </div>

          <div className='flex flex-wrap items-center'>
            <button
              type='submit'
              onClick={(e) => {
                handleSubmit(e);
              }}
              className=' bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-3 px-4 rounded '
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
              Add User
            </button>
          </div>
        </form>
      </>
    </DashboardOutline>
  );
};

export default Add;
