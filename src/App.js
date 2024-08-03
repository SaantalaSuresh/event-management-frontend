// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import NavBar from './components/NavBar';
// // import Sidebar from './components/Sidebar';
// // import EventList from './pages/EventList';
// // import CreateEvent from './pages/CreateEvent';
// // import EventDetail from './pages/EventDetail';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import './styles/App.css';

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     setIsAuthenticated(!!token);
// //   }, []);

// //   return (
// //     <Router>
// //       <div className="App">
// //         <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
// //         <div className="main-content">
// //           {/* <Sidebar isAuthenticated={isAuthenticated} /> */}
// //           <div className="content">
// //             <Routes>
// //               <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/events" />} />
// //               <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/events" />} />
// //               <Route path="/events" element={isAuthenticated ? <EventList /> : <Navigate to="/login" />} />
// //               <Route path="/create-event" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
// //               <Route path="/events/:id" element={isAuthenticated ? <EventDetail /> : <Navigate to="/login" />} />
// //               <Route path="*" element={<Navigate to={isAuthenticated ? "/events" : "/register"} />} />
// //             </Routes>
// //           </div>
// //         </div>
// //         <ToastContainer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NavBar from './components/NavBar';
// import Sidebar from './components/Sidebar';
// import EventList from './pages/EventList';
// import CreateEvent from './pages/CreateEvent';
// import EventDetail from './pages/EventDetail';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import './styles/App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
//         <div className="main-content">
//           <Sidebar isAuthenticated={isAuthenticated} />
//           <div className="content">
//             <Routes>
//               <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/events" />} />
//               <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/events" />} />
//               <Route path="/events" element={isAuthenticated ? <EventList /> : <Navigate to="/login" />} />
//               <Route path="/create-event" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
//               <Route path="/events/:id" element={isAuthenticated ? <EventDetail /> : <Navigate to="/login" />} />
//               <Route path="*" element={<Navigate to={isAuthenticated ? "/events" : "/register"} />} />
//             </Routes>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  return (
    <div className="App">
      {(location.pathname !== '/login' && location.pathname !== '/register') && (
        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      )}
      <div className="main-content">
        {(location.pathname !== '/login' && location.pathname !== '/register') && (
          <Sidebar isAuthenticated={isAuthenticated} />
        )}
        <div className="content">
          <Routes>
            <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/events" />} />
            <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/events" />} />
            <Route path="/events" element={isAuthenticated ? <EventList /> : <Navigate to="/login" />} />
            <Route path="/create-event" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
            <Route path="/events/:id" element={isAuthenticated ? <EventDetail /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/events" : "/register"} />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
     
    </Router>
  );
}

export default App;
