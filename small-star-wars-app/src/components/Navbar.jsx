import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: '#333',
    marginBottom: '20px',
    justifyContent: 'center'
  };

  return (
    <nav style={navStyle}>
      <Link to="/">Inicio</Link>
      <Link to="/people">Personajes</Link>
      <Link to="/films">Películas</Link>
      <Link to="/starships">Naves</Link>
    </nav>
  );
}

export default Navbar;