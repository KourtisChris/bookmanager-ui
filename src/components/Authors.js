import { useState, useEffect } from 'react';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [editAuthor, setEditAuthor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    nationality: '',
    birth_date: ''
  });

  useEffect(() => {
    fetch('http://localhost:9090/authors')
      .then(response => response.json())
      .then(data => setAuthors(data));
  }, []);

  const deleteAuthor = (id) => {
    const confirmed = window.confirm('Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτόν τον συγγραφέα;');
    if (confirmed) {
      fetch(`http://localhost:9090/authors/${id}`, { method: 'DELETE' })
        .then(() => setAuthors(authors.filter(author => author.id !== id)));
    }
  };

  const saveAuthor = () => {
    fetch(`http://localhost:9090/authors/${editAuthor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editAuthor)
    })
    .then(response => response.json())
    .then(updated => {
      setAuthors(authors.map(author => author.id === updated.id ? updated : author));
      setEditAuthor(null);
    });
  };

  const addAuthor = () => {
    fetch('http://localhost:9090/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAuthor)
    })
    .then(response => response.json())
    .then(() => {
      fetch('http://localhost:9090/authors')
        .then(response => response.json())
        .then(data => {
          setAuthors(data);
          setShowAddForm(false);
          setNewAuthor({ name: '', nationality: '', birth_date: '' });
        });
    });
  };

  return (
    <div>
      <h2>Authors</h2>

      {editAuthor ? (
        <div>
          <h3>Edit Author</h3>
          <div>
            <label>Name:</label><br/>
            <input
              value={editAuthor.name}
              onChange={e => setEditAuthor({ ...editAuthor, name: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Nationality:</label><br/>
            <input
              value={editAuthor.nationality}
              onChange={e => setEditAuthor({ ...editAuthor, nationality: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Birth Date:</label><br/>
            <input
              type="date"
              value={editAuthor.birth_date}
              onChange={e => setEditAuthor({ ...editAuthor, birth_date: e.target.value })}
            />
          </div>
          <br/>
          <button onClick={saveAuthor}>Save</button>
          <button onClick={() => setEditAuthor(null)}>Cancel</button>
        </div>

      ) : showAddForm ? (
        <div>
          <h3>Add Author</h3>
          <div>
            <label>Name:</label><br/>
            <input
              value={newAuthor.name}
              onChange={e => setNewAuthor({ ...newAuthor, name: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Nationality:</label><br/>
            <input
              value={newAuthor.nationality}
              onChange={e => setNewAuthor({ ...newAuthor, nationality: e.target.value })}
            />
          </div>
          <br/>
          <div>
            <label>Birth Date:</label><br/>
            <input
              type="date"
              value={newAuthor.birth_date}
              onChange={e => setNewAuthor({ ...newAuthor, birth_date: e.target.value })}
            />
          </div>
          <br/>
          <button onClick={addAuthor}>Add</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>

      ) : (
        <div>
          <button onClick={() => setShowAddForm(true)}>+ Add Author</button>
          <ul>
            {authors.map(author => (
              <li key={author.id}>
                {author.name} — {author.nationality} ({author.birth_date})
                <button onClick={() => setEditAuthor(author)}>Edit</button>
                <button onClick={() => deleteAuthor(author.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Authors;