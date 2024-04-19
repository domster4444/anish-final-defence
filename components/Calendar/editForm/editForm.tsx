//* Refactored
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDeleteRecordMutation, usePatchUpdateRecordMutation } from "app/GlobalRedux/API/eventCalendarApi";

/**
 * @param inputDate  - Tue Jan 09 2024 00:00:00 GMT+0545 (Nepal Time)
 * @returns - 2024-01-09
 */
function convertDateFormat(inputDate: string) {
  const dateObj = new Date(inputDate);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = dateObj.getDate().toString().padStart(2, "0");
  const result = `${year}-${month}-${day}`;
  return result;
}

const AddForm = ({ fetchRecordAndSetTable, selectedEventDetails, closeAddModalHandler }: { fetchRecordAndSetTable: Function; selectedEventDetails: any; closeAddModalHandler: any }) => {
  const [updateRecord, { data: updateRecordData, error: updateRecordError, isLoading: updateRecordIsLoading }] = usePatchUpdateRecordMutation();
  const [deleteRecord, { data: deleteRecordData, error: deleteRecordError, isLoading: deleteRecordIsLoading }] = useDeleteRecordMutation();

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (selectedEventDetails) {
      setTitle(selectedEventDetails.title);
      setStart(convertDateFormat(selectedEventDetails.start));
      setEnd(convertDateFormat(selectedEventDetails.end));
    }
  }, [selectedEventDetails]);

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({
        id: selectedEventDetails.id,
        formData: {
          title: title,
          start: start,
          end: end,
        },
      });

      //@ts-ignore
      if (response.error) {
        //@ts-ignore
        throw new Error(response.error.data.message);
      }

      toast.success("Added Successfully");

      fetchRecordAndSetTable();
    } catch (error) {
      //@ts-ignore
      toast.error(error.message);
    }
    closeAddModalHandler();
  };

  const deleteRecordHandler = async (id: string) => {
    try {
      const response = await deleteRecord({
        id: id,
      });

      console.log(response);
      //@ts-ignore

      if (response.error) {
        //@ts-ignore

        throw new Error(response.error.data.message);
      }
      fetchRecordAndSetTable();
      toast.success("Calendar Event Deleted Successfully");
    } catch (error) {
      //@ts-ignore
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='flex flex-wrap -mx-3 mt-3'>
        <div className='w-full md:w-1/3 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Title
          </label>
          <input
            value={title}
            name='school_location'
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoComplete='off'
            className='appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Enter school location'
          />
        </div>
        <div className='w-full md:w-1/3 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            Start Date
          </label>
          <input
            value={start}
            name='start'
            onChange={(e) => {
              setStart(e.target.value);
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='date'
            placeholder='Enter package renewal date'
          />
        </div>

        <div className='w-full md:w-1/3 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
            End Date
          </label>
          <input
            value={end}
            name='end'
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            autoComplete='off'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='date'
            placeholder='Enter package renewal date'
          />
        </div>
      </div>

      <div className='mt-4'>
        <button onClick={handleSubmit} type='button' className='inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white p-2 rounded'>
          Update Event
        </button>
        <button
          onClick={() => {
            deleteRecordHandler(selectedEventDetails.id);
            closeAddModalHandler();
            fetchRecordAndSetTable();
          }}
          type='button'
          className='inline-flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white p-2 rounded ml-2'
        >
          Delete Event
        </button>
        <button type='button' className='inline-flex justify-center items-center bg-gray-400 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 text-white p-2 rounded ml-2' onClick={closeAddModalHandler}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddForm;
