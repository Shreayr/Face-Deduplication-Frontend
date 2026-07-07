import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import API from "../api/api";

import Navbar from "../components/Navbar";
import "./Upload.css";

function Upload() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Add files while preventing duplicates
  const addFiles = (newFiles) => {
    setFiles((prevFiles) => {
      const uniqueFiles = newFiles.filter((newFile) => {
        return !prevFiles.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size &&
            existingFile.lastModified === newFile.lastModified
        );
      });

      const duplicateCount = newFiles.length - uniqueFiles.length;

      if (duplicateCount > 0) {
        setMessage(`${duplicateCount} duplicate file(s) were ignored.`);

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

      return [...prevFiles, ...uniqueFiles];
    });
  };

  // Browse files
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    addFiles(selectedFiles);

    // Allows selecting the same file again after removing it
    event.target.value = "";
  };

  // Drag Over
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  // Drag Leave
  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  // Drop Files
  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    addFiles(droppedFiles);
  };

  // Remove image
  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // Find Duplicates button
  const handleFindDuplicates = async () => {

  if (files.length === 0) {
    alert("Please upload at least one image.");
    return;
  }

  setLoading(true);

  try {

    for (const file of files) {

      const formData = new FormData();

      formData.append("image", file);

      const token = localStorage.getItem("token");

    await API.post(
      "/upload-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    }

    setLoading(false);

    navigate("/results");

  } catch (error) {

    console.log(error);

    alert("Upload Failed");

    setLoading(false);

  }
};
    if (loading) {
  return (
    <>
      <Navbar />

      <div className="loading-screen">

        <div className="spinner"></div>

        <h2>Finding Duplicate Faces...</h2>

        <p>Please wait while the images are being processed.</p>

      </div>
    </>
  );
}
  return (
    <>
      <Navbar />

      <div className="upload-page">
        <h1>Upload Images</h1>

        <p>
          Upload multiple images to detect duplicate faces using AI.
        </p>

        <label
  className={`upload-box ${dragActive ? "drag-active" : ""}`}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
>

  <FaCloudUploadAlt className="upload-icon" />

  <h2>Drag & Drop Images Here</h2>

  <p>or click to browse</p>

  <input
    className="file-input"
    type="file"
    multiple
    accept="image/*"
    onChange={handleFileChange}
  />

</label>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <h3>Images Selected: {files.length}</h3>

        <div className="gallery">
  {files.map((file, index) => (
    <div className="image-card" key={index}>

      <button
        className="remove-icon"
        onClick={() => removeFile(index)}
      >
        ✖
      </button>

      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
      />

      <div className="image-info">

        <h4>{file.name}</h4>

       <p>
  {file.size < 1024 * 1024
    ? `${(file.size / 1024).toFixed(1)} KB`
    : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
</p>

      </div>

    </div>
  ))}
</div>

        <button
          className="detect-btn"
          onClick={handleFindDuplicates}
        >
          Find Duplicates
        </button>
      </div>
    </>
  );
}

export default Upload;