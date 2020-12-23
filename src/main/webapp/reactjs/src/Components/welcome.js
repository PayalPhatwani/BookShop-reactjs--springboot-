import React, { Component } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

export default class Welcome extends Component {
    render() {
        return (
          <Container fluid className="p-0 m-0">
            <NavigationBar />
            <Container>
                  <Jumbotron className="bg-dark text-white text-center">
                    <h1 className="display-3">Welcome to Book Shop</h1>
                    <blockquote className="blockquote mb-0">
                      <p className="lead">
                        Good friends, good books, and a sleepy conscience :this
                        is the ideal life.
                      </p>
                      <footer className="blockquote-footer">Mark Twain</footer>
                    </blockquote>
                  </Jumbotron>
            </Container>
          </Container>
        );
    }
}
