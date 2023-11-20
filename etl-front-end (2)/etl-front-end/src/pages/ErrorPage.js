import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Oops! 404 Error</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '20px', textAlign: 'center' }}>We couldn't find the page you're looking for.</p>
      <p style={{ fontSize: '1em', marginBottom: '40px', textAlign: 'center' }}>It seems you've entered the wrong URL. Please check and try again.</p>
      <button style={{ padding: '10px 20px', fontSize: '1.2em', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={goToLoginPage}>Go Back</button>
    </div>
  );
};

export default ErrorPage;
// import React from 'react';

// const ErrorPage = () => {
//   const goToLoginPage = () => {
//     window.location.href = '/';
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
//       <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Oops! 404 Error</h1>
//       <p style={{ fontSize: '1.2em', marginBottom: '20px', textAlign: 'center' }}>We couldn't find the page you're looking for.</p>
//       <p style={{ fontSize: '1em', marginBottom: '40px', textAlign: 'center' }}>It seems you've entered the wrong URL. Please check and try again.</p>
//       <button style={{ padding: '10px 20px', fontSize: '1.2em', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={goToLoginPage}>Go Back</button>
//     </div>
//   );
// };

// export default ErrorPage;
