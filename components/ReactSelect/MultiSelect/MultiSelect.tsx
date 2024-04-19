//@ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import makeAnimated from "react-select/animated";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

const animatedComponents = makeAnimated();

const MultiSelect = ({ allSelectedOptions, setAllSelectedOptions, apiUrl, isMultiSelect = true, key }) => {
  const [isAllOptionFetched, setIsAllOptionFetched] = useState(false);
  const [multiSelectOptionData, setMultiSelectOptionData] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${globalConstant.serverURL}${apiUrl}`,
        {},
        {
          headers: {
            "x-school-id": getDataByValue("schoolId"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        const options = res.data.data.map((item) => ({ value: item._id, label: item.name }));
        setMultiSelectOptionData(options);
        setIsAllOptionFetched(true);
      });
  }, [apiUrl]); // Add apiUrl as a dependency

  useEffect(() => {
    // Handle changes to allSelectedOptions if needed
  }, [allSelectedOptions]);

  if (!isAllOptionFetched) {
    return null; // or a loading indicator
  }

  return (
    <Select
      className='text-center'
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={isMultiSelect}
      options={multiSelectOptionData}
      onChange={(selectedOption) => {
        setAllSelectedOptions(selectedOption);
      }}
      value={allSelectedOptions}
    />
  );
};

export default MultiSelect;
