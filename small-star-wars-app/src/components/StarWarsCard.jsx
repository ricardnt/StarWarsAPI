import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../services/swapi';

function StarWarsCard({ item, category }) {
  const title = item.name || item.title;
  const id = getIdFromUrl(item.url);

  const cardStyle = {
    // Aumentamos el ancho y el alto mínimo
    width: '300px',        
    minHeight: '220px',
    
    // Mejor espaciado interno
    padding: '2rem',
    margin: '1.5rem',      
    
    // Estilos visuales: borde redondeado y fondo oscuro
    border: '1px solid #444',
    borderRadius: '16px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Sombra para dar profundidad
    
    // Flexbox para centrar contenido
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center'
  };

  const titleStyle = {
    color: '#ffe81f', // Amarillo Star Wars
    fontSize: '1.5rem', // Letra mucho más grande
    fontWeight: 'bold',
    margin: '0 0 1.5rem 0'
  };

  const buttonStyle = {
    padding: '10px 24px',
    fontSize: '1.1rem', // Botón más grande y legible
    cursor: 'pointer'
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <Link to={`/${category}/${id}`}>
        <button style={buttonStyle}>Ver Detalles</button>
      </Link>
    </div>
  );
}

export default StarWarsCard;