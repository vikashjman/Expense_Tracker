import React from 'react'
import logo from "../../images/logo 2.png"
import './nav.css'
function Nav() {
  return (
    <div className='navBody' >
      <div className='navTitle'>
        <img src={logo} style={{maxWidth:"100%"}}></img>
      </div>
      <div className='navItems'>
        <label>Home</label>
        <label>Planning</label>
        <label>Bookmarks</label>
        <label>Support Us</label>
        <label>About Us</label>
        <label>Logout</label>
      </div>
    </div>
  )
}

export default Nav

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// function Example() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch
//       </Button>

//       <Offcanvas show={show} onHide={handleClose}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Offcanvas</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           Some text as placeholder. In real life you can have the elements you
//           have chosen. Like, text, images, lists, etc.
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }

// export default Example;