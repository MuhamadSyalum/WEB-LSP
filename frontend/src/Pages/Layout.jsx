import React from "react";
import NavbarLogin from "../components/NavbarLogin"; // Correctly imported
import SidebarLogin from "../components/SidebarLogin"; // Correctly imported

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarLogin /> {/* Use NavbarLogin instead of Navbar */}
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <SidebarLogin /> {/* Use SidebarLogin instead of Sidebar */}
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;