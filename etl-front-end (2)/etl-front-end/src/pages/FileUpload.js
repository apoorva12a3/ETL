import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import myimage from "../styles/upload.png";
import mybg from "../styles/bg1.jpg";
import FooterSmall from "../components/FooterSmall";

const DELAY_DURATION = 100; // Set the initial delay

const FileUpload = () => {
  const navigate = useNavigate(); // Access the navigate function
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const jwtToken = sessionStorage.getItem("jwtToken");

  if (!jwtToken) {
    return <Navigate to="/" />;
  }

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const step = 10; // Set the step size

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${jwtToken}`, // Pass your JWT token here
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        const roundedProgress = Math.floor(progress / step) * step; // Round the progress to the nearest multiple of the step size
        setUploadProgress(roundedProgress); // Update the progress with the rounded value
      },
    };

    try {
      await axios.post("http://localhost:8080/api/csv/upload", formData, config); 

      setUploadMessage("File uploaded successfully.");
      setLoading(false);

      // Navigate to Header/Report after 2 seconds of delay
      setTimeout(() => {
        navigate("/header/report");
      }, 1000);
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploadMessage("An error occurred during file upload.");
      setLoading(false);
    }
  };


  return (
    <>
      <div className="d-flex flex-column" style={{ height: "100vh", overflow: "hidden" }}>
        <div
          className="vh-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${mybg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="col-md-4">
            <div
              className="card shadow p-3"
              style={{ backgroundColor: "white" }}
            >
              <div className="text-center mb-2">
                <img
                  src={myimage}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="card-body">
                <h2
                  className="card-title text-center fs-4 fw-800 text-uppercase text-dark mb-2"
                  style={{ color: "orange" }}
                >
                  Upload File
                </h2><br />
                <form>
                  <div className="mb-5">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileInputChange}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={handleFileUpload}
                      disabled={loading}
                      style={{ backgroundColor: "orange" }}
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                  {loading && (
                    <div className="progress mt-3">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {`${uploadProgress}%`}
                      </div>
                    </div>
                  )}
                  {!loading && (
                    <p className="text-center mt-2" style={{ color: "orange" }}>
                      {uploadMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterSmall />
      </div>
    </>
  );
};

export default FileUpload;
