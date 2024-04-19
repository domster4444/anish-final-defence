//@ts-nocheck
import { useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { globalConstant } from "constant/constant";
import { RootState } from "@/app/GlobalRedux/store";
import { toast } from "react-toastify";

import { usePatchUpdateRecordMutation } from "app/GlobalRedux/API/schoolApi";

const ThemeIdCard = ({ dataToUpdate, selectedDesign, isSelected, setSelectedDesign, redCardFrontDesign, fetchSchoolIdCardDesignAndSetCurrentlySelected }) => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const [patchUpdateRecord, { data, error, isLoading }] = usePatchUpdateRecordMutation();

  const [frontDesign, setFrontDesign] = React.useState(redCardFrontDesign);

  const handleSetSelectedDesign = () => {
    setSelectedDesign({ frontDesign });

    const key = Object.keys(dataToUpdate)[0];
    dataToUpdate[key] = frontDesign;

    console.warn("selected design", frontDesign);
    patchUpdateRecord({
      id: loggedInUserData.schoolId,
      formData: dataToUpdate,
    })
      .then((res) => {
        toast.success("Design updated successfully");
        fetchSchoolIdCardDesignAndSetCurrentlySelected();
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    if (selectedDesign.frontDesign === redCardFrontDesign) {
      setFrontDesign(selectedDesign.frontDesign);
    }
  }, []);

  return (
    <div
      style={{
        borderBottom: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent",
        borderTop: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent",
        borderRight: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent",
        borderLeft: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent",
        borderRadius: ".4rem",
      }}
      className='mx-1 mb-2 p-2 '
    >
      <div
        className='w-48'
        style={{
          height: "8.5rem",
        }}
      >
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <embed src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${frontDesign}`} type='application/pdf' frameBorder='0' scrolling='auto' height='100%' width='100%'></embed>
          </div>
        </div>
      </div>
      <div className='px-2 pt-2 bg-white'>
        <button onClick={handleSetSelectedDesign} className='intel_500 bg-red-500 hover:bg-red-700 text-white  py-2 px-4 my-3 w-full rounded'>
          Select
        </button>
      </div>
    </div>
  );
};

export default ThemeIdCard;
