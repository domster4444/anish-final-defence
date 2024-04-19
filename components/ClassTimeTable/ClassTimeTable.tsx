//@ts-nocheck
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { Tab } from "@headlessui/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";
import { useGetAllSchoolTeacherOfParticularSchoolMutation } from "app/GlobalRedux/API/schoolUserAuthApi";

const ClassTimeTable = ({ selectedClassName, selectedClass, selectedSection, subjects }) => {
  const [getAllStaff, { data: allStaff, error: staffError, isLoading: staffLoading }] = useGetAllSchoolTeacherOfParticularSchoolMutation();
  const [selectedTab, setSelectedTab] = useState(0);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [deletedRows, setDeletedRows] = useState(new Array(days.length).fill([]));
  const [addedRows, setAddedRows] = useState(new Array(days.length).fill([]));
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllStaff()
      .unwrap()
      .then((response) => {
        setTeachers(response.data);
        console.log("response", response);
      });
  }, []);

  const handleDeleteRow = (dayIndex, rowIndex) => {
    const updatedDeletedRows = [...deletedRows];
    updatedDeletedRows[dayIndex] = [...deletedRows[dayIndex], rowIndex];
    setDeletedRows(updatedDeletedRows);
  };

  const handleAddRow = (dayIndex, rowIndex) => {
    const updatedAddedRows = [...addedRows];
    updatedAddedRows[dayIndex] = [...addedRows[dayIndex], rowIndex];
    setAddedRows(updatedAddedRows);
  };

  const getFilteredSubjects = () => {
    let filteredSubjects = [...subjects];
    deletedRows.forEach((rows, dayIndex) => {
      if (dayIndex === selectedTab) {
        rows.forEach((rowIndex) => {
          filteredSubjects = filteredSubjects.filter((_, index) => index !== rowIndex);
        });
      }
    });

    addedRows.forEach((rows, dayIndex) => {
      if (dayIndex === selectedTab) {
        rows.forEach((rowIndex) => {
          const newRow = { subject: "", teacher: "", timeFrom: "", timeTo: "" };
          filteredSubjects.splice(rowIndex, 0, newRow);
        });
      }
    });

    return filteredSubjects;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //! VALIDATION FOR EMPTY FIELDS starts here
    const tables = document.querySelectorAll("table");
    const timeTable = [];
    let isValid = true;
    tables.forEach((table, index) => {
      if (index !== selectedTab) return;

      const rows = table.querySelectorAll("tbody tr")[0];

      const subject = rows.querySelector("td select").value;
      const teacher = rows.querySelector("td select").value;
      const timeFrom = rows.querySelectorAll("td input")[0].value;
      const timeTo = rows.querySelectorAll("td input")[1].value;

      if (!subject || !teacher || !timeFrom || !timeTo) {
        isValid = false;
        return;
      }
    });

    if (!isValid) {
      toast.error("Please fill all fields", {
        position: "bottom-center",
      });
      return;
    }
    //! VALIDATION FOR EMPTY FIELDS ends here
    let dataToStore;
    tables.forEach((table, dayIndex) => {
      const rows = table.querySelectorAll("tbody tr");

      let timeTableName = `${selectedClassName}_${selectedSection}`;
      dataToStore = {
        school: getDataByValue("schoolId"),
        name: timeTableName,
        class: selectedClass,
        section: selectedSection,
        day: days[dayIndex],
        subjects: [],
      };

      rows.forEach((row, rowIndex) => {
        const subject = row.querySelector("td select").value;
        const teacher = row.querySelector(".teacher_id").value;
        const timeFrom = row.querySelectorAll("td input")[0].value;
        const timeTo = row.querySelectorAll("td input")[1].value;
        dataToStore.subjects.push({
          subject,
          teacher,
          timeFrom,
          timeTo,
        });
        timeTable.push(dataToStore);
      });
    });

    //* remove duplicate items of same day in timeTable array and keep only the last one
    let uniqueTimeTable = [];
    timeTable.forEach((item) => {
      if (!uniqueTimeTable.find((x) => x.day === item.day)) {
        uniqueTimeTable.push(item);
      }
    });

    // todo: SAVE DATA TO DATABASE
    const options = {
      url: `${globalConstant.serverURL}/api/v1/classTimeTable/create`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: uniqueTimeTable[selectedTab],
    };

    axios(options)
      .then(() => {
        toast.success("Time Table saved successfully", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      });
  };

  return (
    <>
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List>
          {days.map((day, index) => (
            <Tab className={`px-4 mt-1 py-1 mx-1 rounded-md ${selectedTab === index ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}>{day}</Tab>
          ))}
        </Tab.List>
        {days.map((day, dayIndex) => {
          const styleTab = dayIndex === selectedTab ? { display: "" } : { display: "none" };
          const filteredSubjects = getFilteredSubjects();
          return (
            <div className='relative overflow-x-auto h-screen' style={styleTab} key={dayIndex}>
              <table className='w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Subject
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Teacher
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Time From
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Time To
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubjects.map((subject, rowIndex) => (
                    <tr key={rowIndex} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-6 py-4'>
                        <select name='subject' className='w-full mb-3 rounded-md'>
                          {subjects.map((subj, index) => (
                            <option key={index} value={subj} selected={index === rowIndex}>
                              {subj}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className='px-6 py-4'>
                        <select name='teacher' className='teacher_id w-full mb-3 rounded-md'>
                          {teachers.map((teacher, index) => (
                            <option key={index} value={teacher._id} selected={index === rowIndex}>
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className='px-6 py-4'>
                        <input autoComplete='off' className='time-to appearance-none block w-full text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type='time' />
                      </td>

                      <td className='px-6 py-4'>
                        <input autoComplete='off' className='appearance-none block w-full text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type='time' />
                      </td>
                      <td className='px-6 py-4'>
                        {rowIndex < subjects.length && (
                          <button className='m-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300' onClick={() => handleDeleteRow(dayIndex, rowIndex)}>
                            Delete Time
                          </button>
                        )}

                        {rowIndex === filteredSubjects.length - 1 && (
                          <button className='m-1 bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300' onClick={() => handleAddRow(dayIndex, rowIndex)}>
                            Add Time
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex justify-end'>
                <button onClick={handleSubmit} className='mt-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                  Save {days[selectedTab]} Schedule
                </button>
              </div>
            </div>
          );
        })}
      </Tab.Group>
    </>
  );
};

export default ClassTimeTable;
