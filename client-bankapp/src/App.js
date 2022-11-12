//React and React-Router
import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
//React-Bootstrap
import Container from 'react-bootstrap/Container';

//Components
import NavComponent from './components/NavComponent';
import Footer from './components/Footer';

//Pages
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import AllData from './pages/AllData';
import Login from './pages/Login';
import Withdraw from './pages/Withdraw';
import Deposit from './pages/Deposit';
import Balance from './pages/Balance';

import './App.css';

// Firebase SDK
import { 
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

// Firebase Configuration
import firebaseapp from './firebaseapp'


function App() {
  const [session, setSession] = React.useState(false)

  const auth = getAuth(firebaseapp)
  onAuthStateChanged(auth, usr => {
    usr ? setSession(true) : setSession(false)
  })
  return (
    <>
      <BrowserRouter>
        <NavComponent/>
        <Container fluid className="py-3 mt-3 root">
          <Routes>
            <Route path="/" exact element={ <Home/> }/>
            <Route path="/index.html" exact element={ <Home/> }/>
            <Route path="/CreateAccount/" element={ <CreateAccount/> }/>
            <Route path="/login/" element={ <Login/> }/>
            {
              session ? 
                (
                  <>
                    <Route path="/alldata/" element={ <AllData/> }/>
                    <Route path="/withdraw/" element={ <Withdraw/> }/>
                    <Route path="/deposit/" element={ <Deposit/> }/>
                    <Route path="/balance/" element={ <Balance/> }/>
                  </>
                ):(
                  <></>
                )
            }
          </Routes>
        </Container>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
