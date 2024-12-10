import React, { useRef, useState, useEffect } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const ImageSelector = ({ image, setImage,handleDelete}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImage(file);
    //   setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
    }
  };
  const handleimageclick=()=>{
    handleDelete();
    // inputRef.current.value = null;
    // setPreviewUrl(null);
    setImage(null);
  }

  const onChooseFile = () => {
    inputRef.current.click(); 
  };

  useEffect(() => {
    if (typeof image === "string") {
        setPreviewUrl(image);
      } else if (image) {
        // If the image prop is a File object, create a preview URL
        setPreviewUrl(URL.createObjectURL(image));
      } else {
        // If there is no image, clear the preview URL
        setPreviewUrl(null);
      }
      
      return () => {
        if (previewUrl && typeof previewUrl === "string" && image) {
          URL.revokeObjectURL(previewUrl);
        }
      };
  }, [image]); 

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
        name='image'
      />
      
      {!image && (
        <button className='w-full h-[250px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50 ' onClick={onChooseFile}>
          <div>
            <FaRegFileImage className="text-xl text-cyan-500" />
            <p className="text-sm text-slate-500">Browse image files to upload</p>
          </div>
        </button>
      )}
      
      {image && previewUrl && (
        <div className="w-full relative h-[300px]object-cover rounded cover-lg">
          <img src={previewUrl} alt="selected" className="w-full h-auto rounded-lg" />
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={handleimageclick}
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
