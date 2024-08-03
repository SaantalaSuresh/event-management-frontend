// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Sidebar.css';

// const Sidebar = ({ isAuthenticated }) => {
//   if (!isAuthenticated) return null;

//   return (
//     <div className="sidebar">
//       <ul>
//         <li><Link to="/events">Events</Link></li>
//         <li><Link to="/create-event">Create Event</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isAuthenticated }) => {
  if (!isAuthenticated) return null;

  return (
    <div className="sidebar">
      <ul>
        <li><Link className='Link' to="/events">Events</Link></li>
        <li><Link className='Link' to="/create-event">Create Event</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
