import { Link } from 'react-router-dom';
import { getIdFromUrl } from '../services/swapi';

function StarWarsCard({ item, category }) {
  // SWAPI usa 'name' para personajes/naves pero 'title' para películas.
  // Esto asegura que siempre mostremos el nombre correcto.
  const title = item.name || item.title;
  const id = getIdFromUrl(item.url);

  const cardStyle = {
    border: '1px solid #555',
    borderRadius: '10px',
    padding: '1.5rem',
    margin: '1rem',
    width: '220px',
    backgroundColor: '#2a2a2a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '150px'
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{title}</h3>
      <Link to={`/${category}/${id}`}>
        <button>Ver Detalles</button>
      </Link>
    </div>
  );
}

export default StarWarsCard;