import React, { Component } from 'react'
import {Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (
          <Navbar bg="dark" variant="dark" className="mb-2">
            <Link to={""} className="navbar-brand">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
                width="25"
                height="25"
                alt="Book"
              />
              Book Shop
            </Link>
            <Nav className="mr-auto">
              <Link to={"add"} className="nav-link">
                Add Book
              </Link>
              <Link to={"list"} className="nav-link">
                Book List
              </Link>
              <Link to={"users"} className="nav-link">
                User List
              </Link>
            </Nav>
          </Navbar>
        );
    }
}
