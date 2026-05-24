import { useState, useEffect } from 'react';
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    isbn: '',
    category: '',
    publication_year: ''
  });

  useEffect(() => {
    axios.get('http://localhost:9090/books')
      .then(response => setBooks(response.data));
  }, []);

  const deleteBook = (id) => {
    const confirmed = window.confirm('Are tou sure that you want to delete this book?');
    if (confirmed) {
      axios.delete(`http://localhost:9090/books/${id}`)
        .then(() => setBooks(books.filter(book => book.id !== id)));
    }
  };

  const saveBook = () => {
    axios.put(`http://localhost:9090/books/${editBook.id}`, {
      ...editBook,
      publication_year: parseInt(editBook.publication_year)
    })
    .then(response => {
      setBooks(books.map(book => book.id === response.data.id ? response.data : book));
      setEditBook(null);
    });
  };

  const addBook = () => {
    axios.post('http://localhost:9090/books', {
      ...newBook,
      publication_year: parseInt(newBook.publication_year)
    })
    .then(() => {
      axios.get('http://localhost:9090/books')
        .then(response => {
          setBooks(response.data);
          setShowAddForm(false);
          setNewBook({ title: '', isbn: '', category: '', publication_year: '' });
        });
    });
  };

  return (
    <div>
      <h2>Books</h2>

      {editBook ? (
        <div>
          <h3>Edit Book</h3>
          <div>
            <label>Title:</label><br/>
            <input
              value={editBook.title}
              onChange={e => setEditBook({ ...editBook, title: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>ISBN:</label><br/>
            <input
              value={editBook.isbn}
              onChange={e => setEditBook({ ...editBook, isbn: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Category:</label><br/>
            <input
              value={editBook.category}
              onChange={e => setEditBook({ ...editBook, category: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Publication Year:</label><br/>
            <input
              value={editBook.publication_year}
              onChange={e => setEditBook({ ...editBook, publication_year: e.target.value })}
            />
          </div>
          <br/>
          <button onClick={saveBook}>Save</button>
          <button onClick={() => setEditBook(null)}>Cancel</button>
        </div>

      ) : showAddForm ? (
        <div>
          <h3>Add Book</h3>
          <div>
            <label>Title:</label><br/>
            <input
              value={newBook.title}
              onChange={e => setNewBook({ ...newBook, title: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>ISBN:</label><br/>
            <input
              value={newBook.isbn}
              onChange={e => setNewBook({ ...newBook, isbn: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Category:</label><br/>
            <input
              value={newBook.category}
              onChange={e => setNewBook({ ...newBook, category: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Publication Year:</label><br/>
            <input
              value={newBook.publication_year}
              onChange={e => setNewBook({ ...newBook, publication_year: e.target.value })}
            />
          </div>
          <br/>
          <button onClick={addBook}>Add</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>

      ) : (
        <div>
          <button onClick={() => setShowAddForm(true)}>+ Add Book</button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category}</td>
                  <td>{book.publication_year}</td>
                  <td>
                    <button onClick={() => setEditBook(book)}>Edit</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Books;