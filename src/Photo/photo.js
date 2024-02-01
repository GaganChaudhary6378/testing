import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosSettings, IoMdInformationCircleOutline } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { Tooltip } from 'react-tooltip';

export default function Photo() {
    const [fileSelected, setFileSelected] = useState(false);
    const [filename, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileSize = file.size / 1024 / 1024; // Convert to MB

            if (fileSize > 5) {
                alert("File size exceeds 5MB. Please choose a smaller file.");
                // Optionally, you can clear the file input
                fileInputRef.current.value = "";
                return;
            }

            const fileType = file.type;
            if (fileType !== "image/jpeg" && fileType !== "image/png") {
                alert("Invalid file type. Please choose a JPG or PNG image.");
                // Optionally, you can clear the file input
                fileInputRef.current.value = "";
                return;
            }

            // Handle the file as needed (e.g., upload or display preview)
            setFileSelected(true);
            setFileName(file.name);
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
            console.log("File selected:", file);
        }
    };

    return (
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col lg:w-[32%] lg:h-[80%] w-screen h-screen bg-white items-center pb-4 rounded-lg shadow-lg shadow-gray-400">
                <div className="flex flex-row justify-between items-center w-full p-2">
                    <IoIosArrowBack className="text-3xl hover:cursor-pointer" />
                    <p className="text-xl font-sans">Upload Your Photo</p>
                    <IoIosSettings className="text-3xl hover:cursor-pointer" />
                </div>

                <div className="bg-gray-400 lg:w-44 lg:h-44 mt-20 w-[70%] h-[30%]" style={{ backgroundImage: `url(${imagePreview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <p className="lg:w-64 text-center mt-8 lg:text-base text-xl w-screen lg:p-0 p-4">Upload a photo and discover English names tailored for you!</p>

                <div className="flex flex-row justify-center items-center gap-12 mt-10">
                    <label className="bg-violet-700 rounded-full w-12 h-12 flex justify-center items-center" htmlFor="fileInput">
                        <CiCamera className="text-white lg:text-3xl text-4xl hover:cursor-pointer" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        ref={fileInputRef}
                        accept=".jpg, .jpeg, .png"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <IoMdInformationCircleOutline className="lg:text-3xl text-4xl hover:cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content="Supported: JPG, JPEG, PNG. Max size: 5MB" />
                    <Tooltip id="my-tooltip" place="bottom" />
                </div>

                {fileSelected &&
                    <p className="lg:mt-4 mt-6 text-blue-500 font-bold">Selected File: <span className="text-black">{filename}</span></p>
                }

                <button className="p-2 lg:w-44 w-[70%] rounded-md bg-violet-700 text-white font-semibold mt-14">Continue</button>
            </div>
        </div>
    );
}
