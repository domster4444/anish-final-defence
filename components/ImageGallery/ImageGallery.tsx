//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import SwiperCarousel from "@/components/SwiperCarousel";
import { globalConstant } from "constant/constant";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useDeleteRecordMutation, useGetAllRecordForSpecificSchoolMutation, usePostAddRecordMutation } from "app/GlobalRedux/API/galleryApi";

const ImageGallery = ({ fetchAllGalleryAndSetState, featuredImage, remainingImage }) => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const [deleteRecord, { isLoading: isDeleteLoading }] = useDeleteRecordMutation();

  const [imageCategory, setImageCategory] = useState([
    {
      name: "all",
    },
  ]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [model, setModel] = useState(false);
  const [tempimage, setTempImgSrc] = useState("");

  const getImg = (image: any) => {
    setTempImgSrc(image);
    setModel(true);
  };

  const filteredImages = remainingImage.filter((item) => {
    if (!categoryFilter) {
      return true; // Show all images when no filter is applied
    }
    if (categoryFilter === "all") {
      return true; // Show all images when "All" filter is applied
    }

    return item.imageCategory.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  useEffect(() => {
    const uniqueCategories = new Set(["all"]); // Initialize with "All" to avoid duplicates

    remainingImage.forEach((item) => {
      uniqueCategories.add(item.imageCategory);
    });

    setImageCategory([...uniqueCategories].map((name) => ({ name })));
  }, []);

  const deleteImageHandler = (id) => async () => {
    await deleteRecord({
      id: id,
    }).then((res) => {
      console.log(res);
      fetchAllGalleryAndSetState();
    });
  };

  return (
    <>
      <div className={model ? "gallery-model open" : "gallery-model "}>
        <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${tempimage}`} alt='' />
        <a href={tempimage} download='filename.jpg'>
          <button className='download-model-icon'>DOWNLOAD</button>
        </a>
        <button className='close-model-icon' onClick={() => setModel(false)}>
          CLOSE
        </button>
      </div>
      <div className='mb-3 mt-6'>
        <SwiperCarousel featuredImage={featuredImage} />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
        {featuredImage.map((item, index) => (
          <>
            <div className='position pics border-2 border-gray-300 ' key={index} onClick={() => getImg(item.image)}>
              <button className='flex items-center absolute z-10 bg-red-500 px-2 py-1 rounded m-1' onClick={deleteImageHandler(item._id)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='white' height='10' width='8' viewBox='0 0 448 512'>
                  <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                </svg>
                <span className='text-xs text-white intel_400 ms-1'>delete</span>
              </button>
              <img
                style={{
                  borderRadius: ".25rem",
                  height: "140px",
                }}
                className='h-auto max-w-full cursor-pointer  hover:opacity-75 '
                src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${item.image}`}
                alt='school photos'
              />
            </div>
          </>
        ))}
        {remainingImage.map((item, index) => (
          <>
            <div className='position pics border-2 border-gray-300 ' key={index} onClick={() => getImg(item.image)}>
              <button className='flex items-center absolute z-10 bg-red-500 px-2 py-1 rounded m-1' onClick={deleteImageHandler(item._id)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='white' height='10' width='8' viewBox='0 0 448 512'>
                  <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                </svg>
                <span className='text-xs text-white intel_400 ms-1'>delete</span>
              </button>
              <img
                style={{
                  borderRadius: ".25rem",
                  height: "140px",
                }}
                className='h-auto max-w-full cursor-pointer  hover:opacity-75 '
                src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${item.image}`}
                alt='school photos'
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
