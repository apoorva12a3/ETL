import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import FileUpload from "./pages/FileUpload.js";
import Header from "./components/Header.js";
import ErrorPage from "./pages/ErrorPage.js"
import ReportBatch from "./pages/ReportBatch.js";
import Home1 from "./pages/Home1.js";
import Charts from "./pages/Charts.js";

function App() {
  return (
   
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/navbar/*" element={<Navbar />}>
        <Route path="home" element={<Home1 />} />
         
        </Route>
        <Route path="/header" element={<Header />} >
          <Route path="fileUpload" element={<FileUpload />} />
          <Route path="report" element={<ReportBatch />} />
          <Route path="chart" element={<Charts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
