import { useState, useEffect } from 'react';

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
    fetch('http://localhost:9090/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const deleteBook = (id) => {
    const confirmed = window.confirm('Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το βιβλίο;');
    if (confirmed) {
      fetch(`http://localhost:9090/books/${id}`, { method: 'DELETE' })
        .then(() => setBooks(books.filter(book => book.id !== id)));
    }
  };

  const saveBook = () => {
    fetch(`http://localhost:9090/books/${editBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...editBook,
        publication_year: parseInt(editBook.publication_year)
      })
    })
    .then(response => response.json())
    .then(updated => {
      setBooks(books.map(book => book.id === updated.id ? updated : book));
      setEditBook(null);
    });
  };

  const addBook = () => {
    fetch('http://localhost:9090/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBook,
        publication_year: parseInt(newBook.publication_year)
      })
    })
    .then(response => response.json())
    .then(() => {
      fetch('http://localhost:9090/books')
        .then(response => response.json())
        .then(data => {
          setBooks(data);
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
          <ul>
            {books.map(book => (
              <li key={book.id}>
                {book.title} — {book.category} ({book.publication_year})
                <button onClick={() => setEditBook(book)}>Edit</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Books;