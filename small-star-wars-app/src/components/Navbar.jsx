import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: '30px',             // Más separación entre links
    padding: '20px',
    background: '#1a1a1a',   // Un poco más oscuro para diferenciar del fondo
    borderBottom: '1px solid #333',
    marginBottom: '40px',
    justifyContent: 'center',
    alignItems: 'center'
  };

  // Estilo específico para los links del menú para que parezcan botones de texto
  const linkStyle = {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  return (
    <nav style={navStyle}>
      {/* Usamos style={linkStyle} en cada Link */}
      <Link to="/" style={linkStyle}>Inicio</Link>
      <Link to="/people" style={linkStyle}>Personajes</Link>
      <Link to="/films" style={linkStyle}>Películas</Link>
      <Link to="/starships" style={linkStyle}>Naves</Link>
    </nav>
  );
}

export default Navbar;