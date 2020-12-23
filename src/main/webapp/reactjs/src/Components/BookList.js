import React, { Component } from "react";
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Style.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "./NavigationBar";

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentPage: 1,
      booksPerPage: 5,
      totalElements: 0,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.findAllBooks(this.state.currentPage);
    toast(<b>Book Data Loaded</b>);
  }

  findAllBooks(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:9090/rest/books?page=" +
          currentPage +
          "&size=" +
          this.state.booksPerPage
      )
      .then((response) => {
        this.setState({
          books: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          currentPage: response.data.number + 1,
        });
      })
      .catch((error) => console.error("Booklist didmount"));
  }

  deleteBook = (bookId) => {
    axios
      .delete("http://localhost:9090/rest/books/" + bookId)
      .then((response) => {
        if (response.data != null) {
          toast.success(<b>Deleted SuccessFull</b>);
          this.setState({
            books: this.state.books.filter((book) => book.id !== bookId),
          });
        } else {
          toast.error(<b>error occured in deletion</b>);
        }
      });
  };
  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
      
    });
    this.findAllBooks(event.target.value);
  };
  
  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      this.findAllBooks(firstPage);
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      this.findAllBooks(this.state.currentPage - prevPage);
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage
    );
    if (this.state.currentPage < condition) {
      this.findAllBooks(condition);
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.booksPerPage)
    ) {
      this.findAllBooks(this.state.currentPage + 1);
    }
  };

  render() {
    const { books, currentPage, totalPages } = this.state;
    return (
      <Container fluid className="p-0 m-0">
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} className="margin-top">
              <Card className={"border border-dark bg-dark text-white"}></Card>
              <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                  <FontAwesomeIcon icon={faList} /> Book List
                </Card.Header>
                <Card.Body>
                  <Table bordered hover striped variant="dark">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN Number</th>
                        <th>Price</th>
                        <th>Language</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.length === 0 ? (
                        <tr className="text-center">
                          <td
                            // @ts-ignore
                            colSpan="6"
                          >
                            {" "}
                            No Books avalaible
                          </td>
                        </tr>
                      ) : (
                        books.map((book) => (
                          <tr key={book.id}>
                            <td>
                              <Image
                                src={book.coverPhotoUrl}
                                roundedCircle
                                width="25"
                                height="25"
                              />
                              {book.title}
                            </td>
                            <td>{book.author}</td>
                            <td>{book.isbnNumber}</td>
                            <td>{book.price}</td>
                            <td>{book.language}</td>
                            <td>
                              <ButtonGroup>
                                <Link
                                  to={"edit/" + book.id}
                                  className=" btn btn-sm  btn-outline-primary m-1"
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                  ></FontAwesomeIcon>
                                </Link>
                                <Button
                                  size="sm"
                                  className="m-1"
                                  variant="outline-danger"
                                  onClick={this.deleteBook.bind(this, book.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                  ></FontAwesomeIcon>
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
                {books.length > 0 ? (
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
                          className="pageNumCss "
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
