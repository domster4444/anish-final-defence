//@ts-nocheck
import { useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { globalConstant } from "constant/constant";
import { RootState } from "@/app/GlobalRedux/store";
import { toast } from "react-toastify";

import { usePatchUpdateRecordMutation } from "app/GlobalRedux/API/schoolApi";

const ThemeIdCard = ({ selectedDesign, isSelected, setSelectedDesign, redCardFrontDesign, redCardBackDesign, greenCardFrontDesign, greenCardBackDesign, blueCardFrontDesign, blueCardBackDesign, yellowCardFrontDesign, yellowCardBackDesign, fetchSchoolIdCardDesignAndSetCurrentlySelected }) => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const [patchUpdateRecord, { data, error, isLoading }] = usePatchUpdateRecordMutation();

  const [frontDesign, setFrontDesign] = React.useState(redCardFrontDesign || greenCardFrontDesign || blueCardFrontDesign || yellowCardFrontDesign);
  const [backDesign, setBackDesign] = React.useState(redCardBackDesign || greenCardBackDesign || blueCardBackDesign || yellowCardBackDesign);

  const handleFrontDesign = (design: any) => {
    setFrontDesign(design);
  };

  const handleBackDesign = (design: any) => {
    setBackDesign(design);
  };

  const handleSetSelectedDesign = () => {
    console.log("selected design", frontDesign, backDesign);
    setSelectedDesign({ frontDesign, backDesign });

    patchUpdateRecord({
      id: loggedInUserData.schoolId,
      formData: {
        selectedIdCardFrontTemplate: frontDesign,
        selectedIdCardBackTemplate: backDesign,
      },
    })
      .then((res) => {
        toast.success("Id card design updated successfully");
        fetchSchoolIdCardDesignAndSetCurrentlySelected();
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    if (selectedDesign.frontDesign === redCardFrontDesign || selectedDesign.frontDesign === greenCardFrontDesign || selectedDesign.frontDesign === blueCardFrontDesign || selectedDesign.frontDesign === yellowCardFrontDesign) {
      setFrontDesign(selectedDesign.frontDesign);
    }

    if (selectedDesign.backDesign === redCardBackDesign || selectedDesign.backDesign === greenCardBackDesign || selectedDesign.backDesign === blueCardBackDesign || selectedDesign.backDesign === yellowCardBackDesign) {
      setBackDesign(selectedDesign.backDesign);
    }
  }, []);

  return (
    <div style={{ borderTop: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent", borderRight: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent", borderLeft: isSelected ? "2.5px solid #bb84e8" : "2.5px solid transparent", borderRadius: ".4rem" }} className='mx-1 mb-2 '>
      <div className='w-48 h-96  flip-card'>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <embed src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${frontDesign}`} type='application/pdf' frameBorder='0' scrolling='auto' height='100%' width='100%'></embed>
          </div>
          <div className='flip-card-back'>
            <embed src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${backDesign}`} type='application/pdf' frameBorder='0' scrolling='auto' height='100%' width='100%'></embed>
          </div>
        </div>
      </div>
      <div className='px-2 pt-2 bg-white'>
        <h4 className='text-sm mb-1 intel_400'>Choose color</h4>
        <div className='flex'>
          <button
            className='h-7 w-7 p-1 me-1 bg-red-500 rounded-full border-3 border-transparent  hover:border-gray-400 '
            onClick={() => {
              handleFrontDesign(redCardFrontDesign);
              handleBackDesign(redCardBackDesign);
            }}
          ></button>
          <button
            className='h-7 w-7 p-1 me-1 bg-green-500 rounded-full border-3 border-transparent  hover:border-gray-400'
            onClick={() => {
              handleFrontDesign(greenCardFrontDesign);
              handleBackDesign(greenCardBackDesign);
            }}
          ></button>

          <button
            className='h-7 w-7 p-1 me-1 bg-blue-500 rounded-full border-3 border-transparent  hover:border-gray-400'
            onClick={() => {
              handleFrontDesign(blueCardFrontDesign);
              handleBackDesign(blueCardBackDesign);
            }}
          ></button>
          <button
            className='h-7 w-7 p-1 me-1 bg-yellow-300 rounded-full border-3 border-transparent  hover:border-gray-400'
            onClick={() => {
              handleFrontDesign(yellowCardFrontDesign);
              handleBackDesign(yellowCardBackDesign);
            }}
          ></button>
        </div>

        <button onClick={handleSetSelectedDesign} className='intel_500 bg-red-500 hover:bg-red-700 text-white  py-2 px-4 my-3 w-full rounded'>
          Select
        </button>
      </div>
    </div>
  );
};

export default ThemeIdCard;
