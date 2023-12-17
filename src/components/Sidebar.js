import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

// Sidebar component that receives 'links' and 'close' as props
const Sidebar = ({ links, close }) => {
  // Get the current location using the 'useLocation' hook from 'react-router-dom'
  const location = useLocation();
  // Render the Sidebar component
  return (
    // Container for the sidebar with a click event to close it when clicked
    <div className="sidebar" onClick={close}>
      {links.map((link) => (
        <Link
          to={link.path}
          className={
            location.pathname === link.path
              ? "sidebar-link active"
              : "sidebar-link"
          }
          key={link.name}
        >
          <FontAwesomeIcon icon={link.icon} />
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
