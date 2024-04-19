//* Refactored
import React, { KeyboardEventHandler } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

export default ({ placeholder, value, setValue }: any) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        // below logic prevent reentering same value again
        if (value && value.find((option: any) => option.label.toLowerCase() === inputValue.toLowerCase())) {
          setInputValue("");
          event.preventDefault();
          return;
        }

        setValue((prev: any) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <>
      <CreatableSelect components={components} inputValue={inputValue} isClearable isMulti menuIsOpen={false} onChange={(newValue) => setValue(newValue)} onInputChange={(newValue) => setInputValue(newValue)} onKeyDown={handleKeyDown} placeholder={placeholder} value={value} />
    </>
  );
};
