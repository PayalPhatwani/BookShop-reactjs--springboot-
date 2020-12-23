import React, { Component } from "react";
import  "./Style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { Button } from "reactstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "./NavigationBar";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  componentDidMount() {
    this.findAllRandomUsers();
    toast("Users Data Loaded");
  }

  findAllRandomUsers() {
    axios
      .get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      )
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => console.error("UserList didmount"));
  }

  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.users.length / this.state.usersPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = users.length / usersPerPage;

    
    return (
       <Container fluid className="p-0 m-0">
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} className="margin-top">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faUsers} /> User List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Address</td>
                  <td>Created on</td>
                  <td>Balance</td>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      // @ts-ignore
                      colSpan="5"
                    >
                      No Users Available
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        {user.first} {user.last}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.created}</td>
                      <td>{user.balance}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {users.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <Button
                      color="primary"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      First
                    </Button>
                    <Button
                      color="primary"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                
                    className="pageNumCss"
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      color="primary"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      Next
                    </Button>
                    <Button
                      color="primary"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      Last
                    </Button>
                  </InputGroup.Prepend>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : (
            ""
          )}
        </Card>
     </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
