import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import profile from "../../images/profile.jpg";
function TopNav() {
  // State to manage the visibility of the additional options
  const [showOptions, setShowOptions] = useState(false);
  // Function to toggle the visibility of additional options
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <Navbar id="Top-Nav" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "whitesmoke" }} href="#home">
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleOptions} // Toggle options when hamburger is clicked
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* Conditional rendering of additional options */}
          <Navbar.Text className="mr-3">
            <img
              src={profile}
              width={"50px"}
              height={"50px"}
              className="profileImg"
              alt="profile"
            />
          </Navbar.Text>
          {showOptions && (
            <>
              <div>
                <Navbar.Text className="mr-3">
                  <a href="#home" style={{ textDecoration: "none" }}>
                    Home
                  </a>
                </Navbar.Text>
              </div>
              <div>
                <Navbar.Text className="mr-3">
                  <a href="#planning" style={{ textDecoration: "none" }}>
                    Planning
                  </a>
                </Navbar.Text>
              </div>
              <div>
                <Navbar.Text className="mr-3">
                  <a href="#bookmarks" style={{ textDecoration: "none" }}>
                    Bookmarks
                  </a>
                </Navbar.Text>
              </div>
              <div>
                <Navbar.Text className="mr-3">
                  <a href="#support-us" style={{ textDecoration: "none" }}>
                    Support Us
                  </a>
                </Navbar.Text>
              </div>
              <div>
                <Navbar.Text className="mr-3">
                  <a href="#about-us" style={{ textDecoration: "none" }}>
                    About Us
                  </a>
                </Navbar.Text>
              </div>
              <div>
                <Navbar.Text className="mr-3">
                  <a href="#logout" style={{ textDecoration: "none" }}>
                    Logout
                  </a>
                </Navbar.Text>
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default TopNav;
