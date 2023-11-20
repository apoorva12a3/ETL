import React, { useState, useEffect, useRef } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import mybg from '../styles/bg1.jpg';
import FooterSmall from "../components/FooterSmall";

const ReportBatch = () => {
  const [reportData, setReportData] = useState(null);
  const [username, setUsername] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showErrorTable, setShowErrorTable] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const errorTableRef = useRef(null);
  const [showDataReport, setShowDataReport] = useState(false);

  const authToken = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    document.body.style.overflow = "hidden";

    fetchUsername();

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
//using promise i.e .then nd .catch
  const fetchUsername = () => {
    axios.get("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        const fetchedUsername = res.data.username;
        setUsername(fetchedUsername);
      })
      .catch((error) => {
        console.error('Error fetching username:', error);
      });
  };

  if (!authToken) {
    return <Navigate to="/" />;
  }

  const handleDataReport = () => {
    if (showDataReport) {
      setReportData(null);
    } else {
      axios
        .get("http://localhost:8080/api/csv/getCombinedReport", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          if (res.data) {
            const formattedData = res.data.split("\n").map((item) => {
              // Your data formatting logic here
              const parts = item.split(" | ");
              if (parts.length >= 4) {
                const entity = parts[0].split("Data values fetched successfully from ")[1].split(":")[0].trim();
                const dataFetched = parts[0].split(":")[1].trim();
                const totalData = parts[1].split(":")[1].trim();
                const violations = parts[2].split(":")[1].trim();
                const date = parts[3].split(":")[1].trim();

                return {
                  entity,
                  dataFetched,
                  totalData,
                  violations,
                  date,
                };
              } else {
                console.error("Parts do not have enough elements:", parts);
                return null;
              }
            });
            setReportData(formattedData);
          } else {
            console.error("Response data is empty");
          }
        })
        .catch((error) => {
          console.error("Error fetching data report:", error);
        });
    }
    setShowDataReport(!showDataReport);
  };

  const handleErrorReport = () => {
    setDownloading(true);
    axios.get("http://localhost:8080/report/generateAndSendReport", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      responseType: 'blob',
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Batch_Report.pdf');
        document.body.appendChild(link);
        link.click();
        setDownloading(false);
        setDownloaded(true);
      })
      .catch((error) => {
        setDownloading(false);
        console.error('Error fetching PDF:', error);
      });
  };

  const handleErrorTable = () => {
    axios
      .get("http://localhost:8080/api/csv/getErrors", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        const formattedErrorData = res.data.map((data) => {
          const timestamp = data.timestamp.split('T')[0].trim() + ' ' + data.timestamp.split('T')[1].split(':')[0].trim() + ':' + data.timestamp.split('T')[1].split(':')[1].trim(); // Extracting date and time till minutes
          return {
            ...data,
            timestamp,
          };
        });
        setErrorData(formattedErrorData);
        setShowErrorTable(!showErrorTable);

        if (!showErrorTable) {
          errorTableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      })
      .catch((error) => {
        console.error('Error fetching error data:', error);
      });
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh", overflow: "hidden" }}>
        <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${mybg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container card-container card p-3 shadow pt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <h2 className="text-center mb-4 text-dark mt-3">All Report Details</h2>
            <div className="card-body text-center">
              <h3 className="text-center mb-4 text-dark mt-3">Greetings, {username ? `${username.charAt(0).toUpperCase()}${username.slice(1).toLowerCase()}` : ''}</h3>
              <h4 className="text-center mb-4 text-dark mt-3">Here is your detailed Data Report</h4>

              <button type="button" className="btn btn-warning btn-lg mx-5" onClick={handleDataReport}>
                {showDataReport ? "Hide Data Report" : "Get Data Report"}
              </button>

              <button type="button" className="btn btn-warning btn-lg mx-5" onClick={handleErrorTable}>
                {showErrorTable ? "Hide Error Table" : "Show Error Table"}
              </button>

              <button type="button" className="btn btn-dark btn-lg mx-5" onClick={handleErrorReport}>
                {downloading ? "Downloading..." : "Download Batch Report"}
              </button>

              {downloaded && (
                <div className="alert alert-success mt-3">Download Successful</div>
              )}
              {downloading && (
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Downloading...</span>
                </div>
              )}

              {reportData && Array.isArray(reportData) && reportData.length > 0 ? (
                <div>
                  <table className="table table-bordered table-hover table-striped table-light mt-4">
                    <thead>
                      <tr>
                        <th>Entity</th>
                        <th>Total Records</th>
                        <th>Records Uploaded</th>
                        <th>Violations</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.entity}</td>
                          <td>{data.totalData}</td>
                          <td>{data.dataFetched}</td>
                          <td>{data.violations}</td>
                          <td>{data.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-3"></p>
              )}
              {showErrorTable && (
                <div style={{ maxHeight: "40vh", overflowY: "auto" }} ref={errorTableRef}>
                  {errorData && errorData.length > 0 ? (
                    <table id="error-table" className="table table-bordered table-hover table-striped table-light mt-4">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Entity Name</th>
                          <th>Error Message</th>
                          <th>Date and Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {errorData.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.entityName}</td>
                            <td>{data.errorMessage}</td>
                            <td>{data.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ marginTop: '20px' }}>
                      <p>No error Table data available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <FooterSmall />
      </div>
    </>
  );
};

export default ReportBatch;

