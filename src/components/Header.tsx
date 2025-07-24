import { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { ThemeContext } from "../GlobalComponents/ThemeProvider";
import { BiSun, BiMoon, BiCart } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router";
import { useCart } from "react-use-cart";

function Header() {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme);
  const isAuthenticated = !!sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setThemeMode(darkMode);
  }, [darkMode]);

  const { isEmpty, totalItems } = useCart();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant={darkMode ? "dark" : "light"}
      className={
        darkMode ? "bg-light-black border-bottom" : "bg-light border-bottom"
      }
      style={{ width: "100%", position: "fixed", zIndex: 100 }}
    >
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand
            className={darkMode ? "text-dark-primary" : "text-light-primary"}
          >
            E-Commerce
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ gap: "1rem" }}>
            {isAuthenticated ? (
              <span
                onClick={handleLogout}
                className={`nav-link cursor-pointer ${
                  darkMode ? "text-dark-primary" : "text-light-primary"
                }`}
                style={{ cursor: "pointer" }}
              >
                Sign-out
              </span>
            ) : (
              <Link
                to="/sign-in"
                className={`nav-link ${
                  darkMode ? "text-dark-primary" : "text-light-primary"
                }`}
              >
                Sign-in
              </Link>
            )}

            <Nav.Link
              className={darkMode ? "text-dark-primary" : "text-light-primary"}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <BiSun size="1.7rem" /> : <BiMoon size="1.7rem" />}
            </Nav.Link>

            <Link
              to="/cart"
              className={`${
                darkMode ? "text-dark-primary" : "text-light-primary"
              } d-flex align-items-center`}
            >
              <BiCart size="2rem" />
              {!isEmpty && (
                <span
                  style={{ position: "relative", left: "-21px", top: "-18px" }}
                >
                  {totalItems}
                </span>
              )}
              <span style={{ marginLeft: !isEmpty ? "-13px" : 0 }}>Cart</span>
            </Link>

            <Link
              to="/my-account"
              className={`nav-link ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              <VscAccount size="1.5rem" />
              &nbsp; My Account
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
