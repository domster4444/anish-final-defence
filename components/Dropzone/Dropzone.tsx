// @ts-nocheck
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

function MyDropzone({ className }) {
  const [files, setFiles] = useState([]);
  // for pdf type only { 'application/pdf': ['.pdf'] }
  const onDrop = useCallback(
    (
      acceptedFiles,
      rejectedFiles,
      accept: {
        "application/pdf": [".pdf"];
      }
    ) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [...previousFiles, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]);
      }
      if (rejectedFiles?.length) {
        toast.warn("File size too large or file type invalid.");
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {},
    maxSize: 1024 * 1000 * 2, //2mb
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <form className='mb-5'>
      {/* select area */}
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      {/* preview section */}
      <ul className=''>
        {files.map((file) => (
          <li key={file.name} className='relative inline-block mr-2'>
            <Image src={file.preview} alt='' width={1} height={1} className='w-20 h-20' onLoad={() => URL.revokeObjectURL(file.preview)} />
            <button type='button' className='absolute top-0 right-0 w-5 h-5 bg-red-700' onClick={() => removeFile(file.name)}>
              <XMarkIcon className='w-5 h-5 fill-white hover:bg-red-600' />
            </button>
            <p className='mt-2 font-medium overflow-hidden whitespace-nowrap overflow-ellipsis max-w-20'>{file.name}</p>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default MyDropzone;
