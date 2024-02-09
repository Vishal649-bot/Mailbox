import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    const logOut=()=>{
        localStorage.clear()
    }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Compose">Compose</Nav.Link>
            <Nav.Link href="/Inbox">Inbox</Nav.Link>
            <Nav.Link href="/Sent">Sent</Nav.Link>
            <button onClick={logOut}>logout</button>
          </Nav>
        </Container>
      </Navbar>
      <br />
      
    </>
  );
}

export default NavBar;