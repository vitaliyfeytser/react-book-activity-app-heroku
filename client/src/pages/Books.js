import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import DeleteBtn from '../components/DeleteBtn';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';
import API from '../utils/API';

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: '',
    author: '',
    synopsis: '',
  };

  // Add code here to get all books from the database and save them to this.state.books

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    API.getBooks().then(res => this.setState({ books: res.data }));
  }

  deleteBook(id) {
    API.deleteBook(id).then(res =>
      this.setState({ books: this.state.books.filter(b => b._id !== id) })
    );
  }

  saveBook() {
    API.saveBook({
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis,
    }).then(book => this.setState({ 
      title: '',
      author: '',
      synopsis: '',
      books: [book.data, ...this.state.books] }));
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeAuthor(e) {
    this.setState({ author: e.target.value });
  }

  onChangeSynopsis(e) {
    this.setState({ synopsis: e.target.value });
  }

  render() {
    console.log(this.state);
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <div>
              <Input
                value={this.state.title}
                name="title"
                placeholder="Title (required)"
                onChange={e => this.onChangeTitle(e)}
              />
              <Input
                value={this.state.author}
                name="author"
                placeholder="Author (required)"
                onChange={e => this.onChangeAuthor(e)}
              />
              <TextArea
                name="synopsis"
                value={this.state.synopsis}
                placeholder="Synopsis (Optional)"
                onChange={e => this.onChangeSynopsis(e)}
              />
              <FormBtn onClick={() => this.saveBook()}>Submit Book</FormBtn>
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={'/books/' + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;