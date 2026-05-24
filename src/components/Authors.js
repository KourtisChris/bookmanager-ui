import { useState, useEffect } from 'react';
import axios from 'axios';

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
    axios.get('http://localhost:9090/authors')
      .then(response => setAuthors(response.data));
  }, []);

  const deleteAuthor = (id) => {
    const confirmed = window.confirm('Are tou sure that you want to delete this author?');
    if (confirmed) {
      axios.delete(`http://localhost:9090/authors/${id}`)
        .then(() => setAuthors(authors.filter(author => author.id !== id)));
    }
  };

  const saveAuthor = () => {
    axios.put(`http://localhost:9090/authors/${editAuthor.id}`, editAuthor)
      .then(response => {
        setAuthors(authors.map(author => author.id === response.data.id ? response.data : author));
        setEditAuthor(null);
      });
  };

  const addAuthor = () => {
    axios.post('http://localhost:9090/authors', newAuthor)
      .then(() => {
        axios.get('http://localhost:9090/authors')
          .then(response => {
            setAuthors(response.data);
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Nationality</th>
                <th>Birth Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map(author => (
                <tr key={author.id}>
                  <td>{author.name}</td>
                  <td>{author.nationality}</td>
                  <td>{author.birth_date}</td>
                  <td>
                    <button onClick={() => setEditAuthor(author)}>Edit</button>
                    <button onClick={() => deleteAuthor(author.id)}>Delete</button>
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

export default Authors;