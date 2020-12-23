import React, { Component } from "react";
import { Card, Container, Row, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faList,
  faPlusSquare,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';
import {  toast } from "react-toastify";
import NavigationBar from "./NavigationBar";
export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }

  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoUrl: "",
    isbnNumber: "",
    price: "",
    language: "",
  };

  componentDidMount() {
    const bookId = +this.props.match.params.id;
    if (bookId) {
      axios
        .get("http://localhost:9090/rest/books/" + bookId)
        .then((response) => {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            author: response.data.author,
            coverPhotoUrl: response.data.coverPhotoUrl,
            isbnNumber: response.data.isbnNumber,
            price: response.data.price,
            language: response.data.language,
          });

          console.log(response.data);
        })
        .catch((error) => toast.error("Some error occured"));
    }
  }

  submitBook = (event) => {
    event.preventDefault();
    const book = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoUrl: this.state.coverPhotoUrl,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
    };

    axios.post("http://localhost:9090/rest/books", book).then((response) => {
      if (response.data != null) {
        this.setState(this.initialState);
        toast.success("Added successfully");
      } else {
        toast.error("Not Added,Some Error occured");
      }
    });
  };

  updateBook = (event) => {
    event.preventDefault();

    const book = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoUrl: this.state.coverPhotoUrl,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
    };

    axios.put("http://localhost:9090/rest/books", book).then((response) => {
      if (response.data != null) {
        this.setState(this.initialState);
        toast.success("Updated successfully");
        setTimeout(() => this.bookList(), 2000);
      } else {
        toast.error("Not Added,Some Error occured");
      }
    });
  };

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  bookList = () => {
    return this.props.history.push("/list");
  };
  render() {
    const {
      title,
      author,
      coverPhotoUrl,
      isbnNumber,
      price,
      language,
    } = this.state;
    return (
      <Container fluid className="p-0 m-0">
        {this.state.id ? (
          <h2 className="text-center text-sm text-white m-3 display-4 ">
            Update Book Details
          </h2>
        ) : (
          <NavigationBar />
        )}
        <Container>
          <Row>
            <Col lg={12} className="margin-top">
              <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                  <FontAwesomeIcon icon={this.state.id ? null : faPlusSquare} />{" "}
                  {this.state.id ? (
                    <Button onClick={this.goBack}>Back</Button>
                  ) : (
                    "Add NewBook"
                  )}
                </Card.Header>
                <Form
                  id="bookFormId"
                  onSubmit={this.state.id ? this.updateBook : this.submitBook}
                  onReset={this.resetBook}
                >
                  <Card.Body>
                    <Row>
                      <Col>
                        <FormGroup controlId="fromGridTitle">
                          <Label for="title">Title</Label>
                          <Input
                            required
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.bookChange}
                            placeholder="Enter Book Title"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup controlId="fromGridauthor">
                          <Label for="author">Author</Label>
                          <Input
                            required
                            type="text"
                            name="author"
                            value={author}
                            onChange={this.bookChange}
                            placeholder="Enter Book Author"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup controlId="fromGridTitlecoverPhotoUrl">
                          <Label for="coverPhotoUrl">Cover Photo Url</Label>
                          <Input
                            required
                            type="text"
                            name="coverPhotoUrl"
                            value={coverPhotoUrl}
                            onChange={this.bookChange}
                            placeholder="Enter coverPhotoCover Photo Url"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup controlId="fromGridisbnNumber">
                          <Label for="isbnNumber"> ISBN Number</Label>
                          <Input
                            type="text"
                            name="isbnNumber"
                            value={isbnNumber}
                            onChange={this.bookChange}
                            placeholder="Enter Book ISBN Number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup controlId="fromGridprice">
                          <Label for="price">Price</Label>
                          <Input
                            required
                            type="text"
                            name="price"
                            value={price}
                            onChange={this.bookChange}
                            placeholder="Enter Book Price"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup controlId="fromGridlanguage">
                          <Label for="">Language</Label>
                          <Input
                            type="text"
                            name="language"
                            value={language}
                            onChange={this.bookChange}
                            placeholder="Enter Book Language"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer style={{ textAlign: "center" }}>
                    <Button
                      className="m-1"
                      size="m"
                      color="success"
                      outline
                      type="submit"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faSave} />
                      {this.state.id ? "Update" : "Save"}
                    </Button>
                    <Button
                      className="m-1"
                      size="m"
                      color="info"
                      outline
                      type="reset"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faUndo} /> Reset
                    </Button>
                    <Button
                      onClick={this.bookList.bind(this)}
                      className="m-1"
                      size="m"
                      color="info"
                      outline
                    >
                      {" "}
                      <FontAwesomeIcon icon={faList} /> Book List
                    </Button>
                  </Card.Footer>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
