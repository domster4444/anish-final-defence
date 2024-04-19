//@ts-nocheck
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "" },
  { id: 2, name: "Bikash Chettri" },
  { id: 3, name: "Prakash Dahal" },
  { id: 4, name: "Rojen Maharjan" },
  { id: 5, name: "Preyanka Shah" },
  { id: 6, name: "Jyoti Bhandari" },
  { id: 7, name: "Sujan Shrestha" },
  { id: 8, name: "Utsav Shrestha" },
];

export default function Example() {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople = query === "" ? people : people.filter((person) => person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className='z-10 relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-md bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm'>
            <Combobox.Input className='w-full border-none rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0' placeholder='Search user' displayValue={(person: any) => person.name} onChange={(event) => setQuery(event.target.value)} />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </Combobox.Button>
          </div>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={() => setQuery("")}>
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {filteredPeople.length === 0 && query !== "" ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>Nothing found.</div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option key={person.id} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-red-500 text-white" : "text-gray-900"}`} value={person}>
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{person.name}</span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-red-600"}`}>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
