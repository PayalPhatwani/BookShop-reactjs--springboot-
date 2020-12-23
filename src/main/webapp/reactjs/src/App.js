import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Book from './Components/Book';
import BookList from './Components/BookList';
import Footer from './Components/footer';
import NavigationBar from './Components/NavigationBar';
import Welcome from './Components/welcome';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from './Components/UserList';
function App() {
  return (
    <Router>
      <ToastContainer autoClose={1500} />

      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/add" exact component={Book} />
        <Route path="/edit/:id" exact component={Book} />
        <Route path="/list" exact component={BookList} />
        <Route path="/users" exact component={UserList} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
