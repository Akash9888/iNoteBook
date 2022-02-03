import React from "react";
import {
    Navbar,
    Container,
    Nav,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Navbigation() {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    const handleClick = () => {
        console.log("localStorage=" + localStorage.getItem("token"));
        localStorage.removeItem("token");
        console.log("localStorage2=" + localStorage.getItem("token"));
    };
    return (
        <div>
            <Navbar bg="info" expand="lg">
                <Container fluid>
                    <Nav.Link as={Link} to="/">
                        <img
                            src="https://images.pexels.com/photos/5797903/pexels-photo-5797903.jpeg?cs=srgb&dl=pexels-ann-nekr-5797903.jpg&fm=jpg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Nav.Link>{" "}
                    <h3> iNoteBook</h3>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {localStorage.getItem("token") ? (
                            <>
                                <Nav
                                    activeKey={location.pathname}
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: "100px" }}
                                    navbarScroll>
                                    <Nav.Link as={Link} to="/">
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/addnote">
                                        Add Note
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        variant="danger"
                                        to="/about">
                                        About
                                    </Nav.Link>

                                    <Nav.Link as={Link} to="/profile">
                                        Profile
                                    </Nav.Link>
                                </Nav>

                                <Nav.Link as={Link} to="/login">
                                    <Button
                                        variant="danger"
                                        onClick={handleClick}>
                                        Logout
                                    </Button>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav
                                    activeKey={location.pathname}
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: "100px" }}
                                    navbarScroll></Nav>
                                {/* <Nav.Link as={Link} to="/signup">
                                    <Button variant="warning">Signup</Button>
                                </Nav.Link> */}

                                {location.pathname === "/signup" ? (
                                    <Nav.Link as={Link} to="/login">
                                        <Button variant="success">Login</Button>
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/signup">
                                        <Button variant="warning">
                                            Signup
                                        </Button>
                                    </Nav.Link>
                                )}
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );

    {
        /* <Nav.Link as={Link} to="/login">
                                <Button variant="danger">Login</Button>
                            </Nav.Link>

                            <Nav.Link as={Link} to="/signup">
                                <Button variant="primary">Signup</Button>
                            </Nav.Link> */
    }
}
