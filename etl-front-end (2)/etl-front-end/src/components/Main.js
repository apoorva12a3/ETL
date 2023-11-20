import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // import Link from react-router-dom

import '../styles/services.css';
import '../styles/about.css';
import '../styles/Contact.css'
import extrct from '../styles/extrct1.gif';
import load from '../styles/Loading.gif';
import trans from '../styles/transform.gif';
import fileUpload from '../styles/fileuplod2.gif';
import reports from '../styles/reports3.gif';

export default function Main() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('jwtToken');

    try {
      const response = await fetch('http://localhost:8080/submitContactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Set formSubmitted to true upon successful submission
        setFormSubmitted(true);
        console.log("Form Submitted successfully");

        // Clear the form data after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  return (
    <div>
      <main id="main">
        <section id="services" className="services">
            <br />
          <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="section-title mt-5 pt-5">
              <h2 style={{paddingletf:"40%"}}>Unlock the Magic of Our<span> Services</span></h2>
            </div>
            <br></br><br />
            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-box">
                <div className="icon"><i className="fas fa-file-download"></i></div>
                  <h4 ><a href="/">ETL</a></h4>
                  <p style={{ color: 'black' }}>Extract, Transform, Load," is like the behind-the-scenes magician of the data world. It might not pull rabbits out of hats, but it does something even more magical – it makes data dance.
                  </p>  </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="300">
                <div className="icon-box">
                <div className="icon"><i className="fas fa-check-double"></i></div>
                  <h4><a href="/">Data validation</a></h4>
                  <p style={{ color: 'black' }}>Data validation is like the data world's fact-checker, making sure that everyone in the database is who they claim to be. It's the ultimate guardian against data impostors and ensures a fraud-free data dance!</p></div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box ">
                <div className="icon"><i className="fas fa-broom"></i></div>
                  <h4><a href="/">Data Cleaning</a></h4>

                  <p style={{ color: 'black' }}>Data cleaning is the digital janitor of the data world, sweeping out errors and tidying up messy datasets, ensuring your data is ready to shine like a polished gem.</p> </div>
              </div>
            </div>
          </div>
        </section>
{/*-------------------------------- About Section ------------------------*/}

        <section className="dark about" id="about">
            <br />
        
            <div className="section-title mt-5 pt-5 pl-5" style={{paddingletf:"30%"}}>
              <h2>Peek Behind The Data Curtian: <span>Our ETL Adventure Unveiled!</span></h2>
            </div>
            <br></br>
          <div className="container py-4 ">
            <article className="postcard dark blue">
              <a className="postcard__img_link" href="#">
                <img className="postcard__img" src={extrct} alt="Image Title" />
              </a>
              <div className="postcard__text">
                <h1 className="postcard__title blue"><a href="/">Extract</a></h1>

                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">This is where ETL sneaks into the data warehouse and grabs all the information it needs. Think of it as a data spy, extracting data from various sources like databases, spreadsheets, and even text files.</div>
              </div>
            </article>
            <article className="postcard dark blue">
              <a className="postcard__img_link" href="#">
                <img className="postcard__img" src={trans} alt="Image Title" />
              </a>
              <div className="postcard__text">
                <h1 className="postcard__title blue"><a href="/">Transform</a></h1>

                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">Once ETL has the data in its clutches, it's time to shape it into something useful. With a dash of data cleaning, a sprinkle of data validation, and a whole lot of data manipulation.</div>
              </div>
            </article>
            <article className="postcard dark blue">
              <a className="postcard__img_link" href="#">
                <img className="postcard__img" src={load} alt="Image Title" />
              </a>
              <div className="postcard__text">
                <h1 className="postcard__title blue"><a href="/">Load</a></h1>

                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">ETL serves the transformed data to its audience – the business intelligence tools, dashboards, and analysts. It loads the data into the databases where it's ready to shine.</div>
              </div>
            </article>
          </div>
        </section>
{/*-------------------------------- File Upload ------------------------*/}

        <section className="fileUploadTrial" id="fileUploadTrial">
          <div className="container my-5 z-depth-1">
            <div className="dark-grey-text">
              <div className="row pr-lg-5">
                <div className="col-md-7 mb-4">
                  <div className="view">
                    {/* <img
                      src="https://mdbootstrap.com/img/illustrations/graphics(4).png"
                      className="img-fluid"
                      alt="sample image"
                    /> */}
                    <img
                      src={fileUpload}
                      className="img-fluid"
                      alt="sample image"
                    />
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                  <div>
                    <h3 className="font-weight-bold mb-4 text-black">Data File Upload</h3>
                    <p className='text-secondary'>
                      Streamlining data file upload in ETL processes is crucial for seamless data integration. Simplifying the upload process ensures secure and efficient data transfer, enabling swift and effective data analysis, and enhancing overall operational agility.
                    </p>
                    {/* <button type="button" className="btn btn-warning btn-rounded mx-0">
                      File Upload
                    </button> */}
                    <Link className="btn btn-warning btn-md ml-0" to="/Header/FileUpload" role="button">
                    File Upload
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
{/*-------------------------------- Report Section ------------------------*/}

        <section className='reportsTrial' id='reportsTrial'>
          <div className="container my-5 py-5 z-depth-1">
            <div className="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">

              <div className="row">

                <div className="col-md-6 mt-5">
                  <h3 className="font-weight-bold text-black">Generate Data Report</h3>
                  <p className="text-muted p-3">
                    The system generated the latest batch report. Simultaneously, an error report was compiled, highlighting critical system failures encountered during processing, triggering immediate attention to rectify the issues.
                  </p>
                  <Link className="btn btn-warning btn-md ml-0" to="/Header/reportBatch" role="button">
                    View Reports
                  </Link>
                </div>

                {/* <div className="col-md-6 mb-4 mb-md-0"> */}
                <div className="col-md-6 mb-5">

                  <div className="view overlay z-depth-1-half">
                    {/* <img
                      src="https://mdbootstrap.com/img/Photos/Others/img%20(29).jpg"
                      className="img-fluid"
                      alt=""
                    /> */}
                    <img
                      src={reports}
                      className="img-fluid"
                      alt=""
                    />
                    <a href="#">
                      <div className="mask rgba-white-light"></div>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </section>
{/*-------------------------------- Contact Section ------------------------*/}

<section className="contact" id="contact">
      <div className="container">
        <div className="heading text-center">
          <h2 className='text-black'>
            Contact
            <span> Us </span>
          </h2>
          <p>
            Got a question, comment, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="title">
              <h3>Contact detail</h3>
              <p>
                We're not your typical contact page. Think of us as a whimsical gateway to connect with us!
              </p>
            </div>
            <div className="content">
              <div className="info">
                <i className="fas fa-mobile-alt"></i>
                <h4 className="d-inline-block">
                  PHONE :
                  <br />
                  <span>+91657836913 , +91657836913</span>
                </h4>
              </div>
              <div className="info">
                <i className="far fa-envelope"></i>
                <h4 className="d-inline-block">
                  EMAIL :
                  <br />
                  <span>reconcilio@info.com</span>
                </h4>
              </div>
              <div className="info">
                <i className="fas fa-map-marker-alt"></i>
                <h4 className="d-inline-block">
                  ADDRESS :
                  <br />
                  <span>Ground Floor, Akruti Centre Point, MIDC, Andheri East, Mumbai, Maharashtra, 400093</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={(e)=>{setFormData({...formData, name: e.target.value})}}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={(e)=>{setFormData({...formData, email: e.target.value})}}
                    required
                  />
                </div>
                <div className="col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e)=>{setFormData({...formData, subject: e.target.value})}}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={(e)=>{setFormData({...formData, message: e.target.value})}}
                  required
                />
              </div>
              <br />
              <br />
              <button className="btn btn-block" style={{ width: '25%' }} type="submit">
                Send Now!
              </button>
            </form>
            <br />
            <br />
            {formSubmitted && (
              <div className="alert alert-success" role="alert">
                Form submitted successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>     
      </main>
    </div>
  );
}