import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Books from './components/Books';
import Authors from './components/Authors';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Book Manager</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/authors">Authors</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;