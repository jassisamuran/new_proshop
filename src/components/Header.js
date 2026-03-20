import { useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";

import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setCompareMode } from "../actions/compareActions";
import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";
const Header = () => {
  // const navigate=useNavigate()
  const dispatch = useDispatch();
  const { compareMode } = useSelector((state) => state.compare || false);
  const dispath = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    console.log(userInfo);
    if (userInfo === null || userInfo === undefined) {
      // window.location.reload();
    }
  }, [userInfo]);
  const logoutHandler = () => {
    dispath(logout());
    window.location.reload();
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <BrowserRouter>
              <Routes>
                {/* <SearchBox/> */}
                <Route path="/search/:keyword" element={<SearchBox />} />
                {/* <SearchBox/> */}
              </Routes>
            </BrowserRouter>
            <Nav className="mr-auto">
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
              {userInfo ? (
                <DropdownButton
                  id="dropdown-basic-button"
                  title={userInfo.name}
                >
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </DropdownButton>
              ) : (
                // <NavDropdown title={userInfo.name}id='username'>
                //   <LinkContainer to='/profile'>
                //     <NavDropdown title="profile">
                //       <NavDropdown.Item>Profile</NavDropdown.Item>
                //     </NavDropdown>
                //     <LinkContainer to='/' onClick={logoutHandler}>
                //       <NavDropdown.Item>Logout</NavDropdown.Item>
                //     </LinkContainer>
                //   </LinkContainer>

                // </NavDropdown>

                // <a href='/login'>
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i>Sigin In
                </Nav.Link>
              )}

              {userInfo && userInfo.name === "Admin User" && (
                <DropdownButton id="adminmenu" title="Admin">
                  <Dropdown.Item href="/admin/userlist">Users</Dropdown.Item>
                  <Dropdown.Item href="/admin/productlist">
                    Product
                  </Dropdown.Item>
                  <Dropdown.Item href="/admin/orderlist">Orders</Dropdown.Item>
                </DropdownButton>
              )}
            </Nav>
          </Navbar.Collapse>

          <button
            type="button"
            onClick={() => dispatch(setCompareMode(!compareMode))}
            className={`compare-btn ${compareMode ? "active" : ""}`}
          >
            <i className="fas fa-balance-scale"></i>
            <span className="ms-2">
              {compareMode ? "Comparing" : "Compare"}
            </span>
          </button>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
