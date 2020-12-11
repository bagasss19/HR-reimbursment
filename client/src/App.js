import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Addform from './pages/Addform'
import Profile from './pages/Profile'

import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  if (localStorage.token) {
    return (<div className="App">
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand> <Link to="/">HR Reimbursment</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/profile">Profile</Link></Nav.Link>
            {/* <Nav.Link><Link to="/login">Login</Link></Nav.Link> */}
          </Nav>
          <Form inline>
            <Button variant="outline-primary" onClick={(e) => {
              e.preventDefault()
              localStorage.clear()
              window.location.reload();
            }}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/add" component={Addform} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  </div>
  )
  }
  else {
  return (
    <div className="App">
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand> <Link to="/">HR Reimbursment</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link><Link to="/">Home</Link></Nav.Link> */}
              <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            </Nav>
            {/* <Form inline>
              <Button variant="outline-primary" onClick={(e) => {
                e.preventDefault()
                localStorage.clear()
              
              }}>Logout</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/add" component={Addform} />
        </Switch>
      </Router>
    </div>
  );
 }
}

export default App;
