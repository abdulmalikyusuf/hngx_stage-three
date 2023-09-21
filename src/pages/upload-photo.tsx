import React, { useState, useRef } from 'react';

function ProfilePhotoUpload() {
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Set photoName
    setPhotoName(selectedFile.name);

    // Read and set photoPreview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSelectNewPhoto = () => {
    // Trigger file input click event
    photoInputRef.current.click();
  };

  return (
    <div className="flex items-center justify-center bg-[#F3F4F6] h-[100dvh]">

    <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
      {/* Photo File Input */}
      <input
        type="file"
        className="hidden"
        ref={photoInputRef}
        onChange={handleFileChange}
      />

      <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="photo">
        Profile Photo <span className="text-red-600"> </span>
      </label>

      <div className="text-center">
        {/* Current Profile Photo */}
        <div className="mt-2" style={{ display: !photoPreview ? 'block' : 'none' }}>
          <img
            src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
            className="w-40 h-40 m-auto rounded-full shadow"
            alt="Current Profile"
          />
        </div>

        {/* New Profile Photo Preview */}
        <div className="mt-2" style={{ display: photoPreview ? 'block' : 'none' }}>
          <span
            className="block w-40 h-40 m-auto rounded-full shadow"
            style={{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundImage: `url('${photoPreview}')`,
            }}
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mt-2 ml-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
          onClick={handleSelectNewPhoto}
        >
          Select New Photo
        </button>
      </div>
    </div>
    </div>
  );
}

export default ProfilePhotoUpload;
