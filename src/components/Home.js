function Home() {
  return (
    <div>
      <h2>Welcome to Book Manager!</h2>
      <img 
        src="https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-online-school-concept-3d-rendering-of-laptop-and-books-on-a-image_3772683.jpg" 
        alt="Books"
        style={{ width: '100%', borderRadius: '8px', marginTop: '15px' }}
      />
      <p style={{ marginTop: '15px', color: '#555', lineHeight: '1.6' }}>
        Welcome to Book Manager, a simple app for managing your book collection. 
        Browse through your books, discover new authors and keep your library 
        organized. Add new titles, update existing ones or remove books you no 
        longer need. Everything you need to manage your reading world in one place.
      </p>
    </div>
  );
}

export default Home;