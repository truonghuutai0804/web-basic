import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.scss";

const Header = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">VNPT</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" className="text-uppercase fw-bold">Quản Lý</Nav.Link>
          <Nav.Link href="/create" className="text-uppercase fw-bold">Tạo</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
