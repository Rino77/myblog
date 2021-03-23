import React, {Fragment, useCallback, useEffect, useState}from "react";
import {Navbar , Container, NavbarToggler, Collapse, Nav, NavItem, Form, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from "../components/auth/LoginModal"
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import RegisterModal from "./auth/RegisterModal";

const AppNavbar = () =>
{
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth)
    console.log(userRole, "UserRole")
    
    const dispatch = useDispatch()
    
    const onLogout = useCallback(() =>
    {
        dispatch({
           type: LOGOUT_REQUEST
       }) 
    }, [dispatch])
    
    useEffect(() =>
    {
        setIsOpen(false)
    }, [user])
    const handelToggle = (params) => {
        setIsOpen(!isOpen)      
    }
    const addPostClick = (params) => {
        
    }
    const authLink = (
    <Fragment>
        <NavItem>
            {userRole === "MainJuin" ? (
                <Form className="col mt-2">
                    <Link to="post" className="btn btn-success block text-white px-3" onClick={addPostClick}> 
                    Add Post
                    </Link>
                </Form>
        ): ""}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link>
                        <Button outline color="light" className="px-3">
                                <strong>{ user ? `Welcome ${user.name}`:''}</strong>
                        </Button>
                        </Link>
                    ) : (<Button>
                              <strong>NO USER</strong>
                </Button>)}
                </Form>
            </NavItem>
            <NavItem>
                <Form>
                    <Link onClick={onLogout} to="#">
                        <Button outline color ="light" className ="mt-2">
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
    </Fragment>
)

    const guestLink = (
        <Fragment>
            <NavItem>
                <RegisterModal/>
            </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>

    </Fragment>
)    
    
    
   return(
    <Fragment>
        <Navbar color = 'dark' expand='lg' className="sticky-top">
            <Container>
                <Link to="/" className="text-white text-decoration=none" >
                    Side Project's Blog(리노 블로그)
                </Link>
                   <NavbarToggler onClick={handelToggle}/>
                   <Collapse isOpen={isOpen} navbar>
                       <Nav className='ml-auto d-flex justify=content-around' navbar>
                       {isAuthenticated ?authLink : guestLink}    
                        </Nav>
                   </Collapse>
               </Container>    
        </Navbar>
    </Fragment>
   )
}

export default AppNavbar;