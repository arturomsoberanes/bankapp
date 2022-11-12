import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Firebase SDK
import { 
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

// Firebase Configuration
import firebaseapp from '../firebaseapp'

function NavComponent() {
  const [session, setSession] = React.useState(false)

  const auth = getAuth(firebaseapp)
  onAuthStateChanged(auth, usr => {
    usr ? setSession(true) : setSession(false)
  })

  const body = document.querySelector('body');
  const wscreen = body.clientWidth >= 1024;
  function activeToggle(e){
    let id = e.currentTarget.id
    let elm = document.querySelector('.nav-link.active');
    elm.classList.remove("active");

    let a = document.getElementById(id);
    if(a.className === 'nav-link'){
      a.className = 'nav-link active';
    }     
  }
  function hoverToggle(e){
    if(!wscreen) return;
    let id = `${e.currentTarget.id}-hover`;
    let elmHover = document.getElementById(id);
    elmHover.className = 'dropdown-menu show';
  }
  function hoverToggleOut(e){
    if(!wscreen) return;
    let id = `${e.currentTarget.id}-hover`;
    let elmHover = document.getElementById(id);
    elmHover.className = 'dropdown-menu';
  }


  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand className="text-danger">
          <Link className="nav-link" to="/">Bankapp</Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Brand>
              <Link
                className="nav-link active"
                id="home" 
                to="/"
                onClick={activeToggle}
                onMouseMove={hoverToggle}
                onMouseOut={hoverToggleOut}>Home</Link>
              <ul id="home-hover" className="dropdown-menu">
                <li className="dropdown-item">Go to Home</li>
              </ul>
            </Navbar.Brand>
            {
              session ? 
                (
                  <>
                    <Navbar.Brand>
                      <Link 
                        className="nav-link"
                        id="alldata"
                        to="/alldata/"
                        onClick={activeToggle}
                        onMouseMove={hoverToggle}
                        onMouseOut={hoverToggleOut}>All Data</Link>
                      <ul id="alldata-hover" className="dropdown-menu">
                        <li className="dropdown-item">Show All</li>
                      </ul>
                    </Navbar.Brand>
                    <NavDropdown title="ATM" className="navbar-brand">
                      <Navbar.Brand>
                        <Link
                          className="nav-link"
                          id="withdraw"
                          to="/withdraw/"
                          onClick={activeToggle}
                          onMouseMove={hoverToggle}
                          onMouseOut={hoverToggleOut}
                        >
                          <span className="text-white">Withdraw</span>
                        </Link>
                        <ul id="withdraw-hover" className="dropdown-menu">
                          <li className="dropdown-item">Withdraw your Money</li>
                        </ul>
                      </Navbar.Brand>
                      <Navbar.Brand>
                        <Link 
                          className="nav-link"
                          id="deposit"
                          to="/deposit/"
                          onClick={activeToggle}
                          onMouseMove={hoverToggle}
                          onMouseOut={hoverToggleOut}
                        >
                          <span className="text-white">Deposit</span>
                        </Link>
                        <ul id="deposit-hover" className="dropdown-menu">
                          <li className="dropdown-item">Deposit your Money</li>
                        </ul>
                      </Navbar.Brand>
                      <Navbar.Brand>
                        <Link 
                          className="nav-link"
                          id="balance"
                          to="/balance/"
                          onClick={activeToggle}
                          onMouseMove={hoverToggle}
                          onMouseOut={hoverToggleOut}
                        >
                          <span className="text-white">Balance</span>
                        </Link>
                        <ul id="balance-hover" className="dropdown-menu">
                          <li className="dropdown-item">View the balance</li>
                        </ul>
                      </Navbar.Brand>
                    </NavDropdown>
                  </>
                ):(
                  <></>
                )
            }
          </Nav>
          <Nav>
            {
              !session ? 
                (
                  <Navbar.Brand>
                    <Link 
                      className="nav-link"
                      id="creaccnt"
                      to="/CreateAccount/"
                      onClick={activeToggle}
                      onMouseMove={hoverToggle}
                      onMouseOut={hoverToggleOut}
                    >
                      <span className="bi bi-person-plus-fill"></span>
                    </Link>
                    <ul id="creaccnt-hover" className="dropdown-menu">
                      <li className="dropdown-item">Create a Account</li>
                    </ul>
                  </Navbar.Brand>
                ) : <></>
            }
            <Navbar.Brand>
              <Link
                className="nav-link"
                id="login"
                to="/login/"
                onClick={activeToggle}
                onMouseMove={hoverToggle}
                onMouseOut={hoverToggleOut}
              >
                <span className="bi bi-person-circle"></span>
              </Link>
              <ul id="login-hover" className="dropdown-menu">
                <li className="dropdown-item">Sign in</li>
              </ul>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
