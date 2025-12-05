import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ItemDetail() {
  const { category, id } = useParams(); // Obtenemos datos de la URL (ej: people, 1)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Construimos la URL específica para el recurso
    const url = `https://swapi.dev/api/${category}/${id}/`;
    
    fetch(url)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [category, id]);

  if (loading) return <h2>Cargando detalles... 🔎</h2>;
  if (!data) return <h2>No se encontró el elemento</h2>;

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center', color: '#ffe81f' }}>
        {data.name || data.title}
      </h1>
      
      {/* Mapeamos las propiedades del objeto para mostrarlas en lista */}
      <div style={{ padding: '20px', background: '#333', borderRadius: '10px' }}>
        {Object.entries(data).slice(0, 8).map(([key, value]) => {
          // Solo mostramos valores que sean texto simple (evitamos arrays complejos por ahora)
          if (typeof value === 'string') {
            return (
              <p key={key} style={{ borderBottom: '1px solid #555', padding: '10px', color: '#ddd' }}>
                <strong style={{ textTransform: 'capitalize', color: '#ffe81f' }}>
                  {key.replace('_', ' ')}:
                </strong>{' '}
                {value}
              </p>
            );
          }
          return null;
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to={`/${category}`}>
          <button>Volver a la lista</button>
        </Link>
      </div>
    </div>
  );
}

export default ItemDetail;