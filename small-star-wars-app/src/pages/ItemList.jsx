import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getResources } from '../services/swapi';
import StarWarsCard from '../components/StarWarsCard';

function ItemList() {
  const { category } = useParams(); // Captura "people", "films", etc. de la URL
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cada vez que cambie la categoría, pedimos datos nuevos
  useEffect(() => {
    setLoading(true);
    getResources(category)
      .then(data => {
        setItems(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Cargando datos del Imperio... ⏳</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textTransform: 'capitalize', textAlign: 'center' }}>
        Lista de {category}
      </h2>
      
      {/* Contenedor flexible para las tarjetas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <StarWarsCard 
            key={item.url} 
            item={item} 
            category={category} 
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;