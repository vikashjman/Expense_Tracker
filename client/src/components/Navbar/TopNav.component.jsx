import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import profile from "../../images/profile.jpg"

function TopNav() {
  return (
    <Navbar id="Top-Nav" expand="lg"> {/* Add expand="lg" to enable the responsive behavior */}
      <Container>
        <Navbar.Brand style={{color:"whitesmoke"}} href="#home">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Add aria-controls to link the toggle to the navbar content */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> {/* Add id and justify-content-end */}
          <Navbar.Text className="mr-3"> {/* Add margin-right for spacing */}
            <img src = {profile} width={"50px"} height={"50px"} className="profileImg"/>
          </Navbar.Text>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
