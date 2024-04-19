import { useState } from "react";
import { usePostSendNewsLetterSubscriptionEmailMutation } from "app/GlobalRedux/API/newsLetterSubscriptionApi";
import { toast } from "react-toastify";
import { toastConfig } from "constant/constant";
import Link from "next/link";

const NewsLetterSubscription = () => {
  const [formData, setFormData] = useState(new FormData());
  const [postSendNewsLetterEmail, { isLoading, error }] = usePostSendNewsLetterSubscriptionEmailMutation();

  const handleInputChange = (e: any) => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response: any = await postSendNewsLetterEmail(formData);

      if (response.error) {
        toast.error(response.error.data.message, toastConfig);
        return;
      }

      toast.success(response.data.message, toastConfig);
    } catch (error) {
      toast.error("An error has been occured", toastConfig);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='w-20 h-20 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <>
      <section className='newsletter-section'>
        <div className='section-container sectiony-spacing'>
          <div className='bg-white dark:bg-gray-900'>
            <div className=' px-4 mx-auto max-w-screen-xl lg:px-6'>
              <div className='mx-auto max-w-screen-md sm:text-center'>
                <h2 className='central-md-heading-title nibpro_semi_bold text-3xl mb-2'>
                  <center>Signup for our news letter</center>
                </h2>
                <p className='mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12  text-md dark:text-gray-400'>
                  Stay up to date with the announcements and exclusive discounts <br /> feel free to sign up with your email.
                </p>
                <form action='#'>
                  <div className='items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
                    <div className='relative w-full'>
                      <label htmlFor='email' className='hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Email address
                      </label>
                      <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                        <svg className='w-5 h-5 text-gray-500 dark:text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
                          <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
                        </svg>
                      </div>
                      <input
                        name='email'
                        onChange={handleInputChange}
                        className='block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Enter your email'
                        type='email'
                        id='email'
                        required={true}
                      />
                    </div>
                    <div>
                      <button
                        type='submit'
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        className='py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-800 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <div className='mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300'>
                    We care about the protection of your data.{" "}
                    <Link href='/privacy' className='font-medium text-primary-600 dark:text-primary-500 hover:underline'>
                      Read our Privacy Policy
                    </Link>
                    .
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetterSubscription;
