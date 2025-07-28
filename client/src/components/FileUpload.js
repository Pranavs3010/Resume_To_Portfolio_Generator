// client/src/components/FileUpload.js

import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onDataReceived }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    // We only take the first file if multiple are selected
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a resume file (PDF or DOCX).");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Pass the received data to the parent component
      onDataReceived(res.data);
    } catch (err) {
      // Set a user-friendly error message
      setError("Failed to parse resume. Please try a different file.");
      console.error(err); // Keep the technical error in the console for debugging
    } finally {
      // Ensure the loading state is turned off
      setLoading(false);
    }
  };

  // This is the updated JSX for the visual presentation
  return (
    <div className="upload-page">
      <div className="upload-container">
        {/* New visual elements */}
        <div className="upload-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="upload-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        <h2>AI Portfolio Generator</h2>
        <p className="upload-subtitle">
          Transform your resume into a stunning portfolio in seconds.
        </p>

        <form onSubmit={handleSubmit}>
          {/* We style the file input to be more modern */}
          <label htmlFor="file-upload" className="custom-file-upload">
            {file ? file.name : "Choose Resume File"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
          />

          <button type="submit" disabled={loading} className="generate-button">
            {loading ? "Generating..." : "Create My Portfolio"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
