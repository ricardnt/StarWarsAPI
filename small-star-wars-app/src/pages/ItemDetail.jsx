import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getIdFromUrl } from '../services/swapi';

// --- NUEVO COMPONENTE ---
// Este componente recibe una URL, averigua el nombre real y muestra el botón
function RelatedButton({ url, categoryKey }) {
  const [label, setLabel] = useState('Cargando...');
  const id = getIdFromUrl(url);

  // Traducimos las claves de la API a nuestras rutas (ej. pilots -> people)
  let route = categoryKey;
  if (categoryKey === 'characters' || categoryKey === 'residents' || categoryKey === 'pilots') route = 'people';
  if (categoryKey === 'homeworld') route = 'planets';

  useEffect(() => {
    // Pedimos el nombre a la API
    fetch(url)
      .then(res => res.json())
      .then(data => setLabel(data.name || data.title)) // Usamos name o title según corresponda
      .catch(() => setLabel('Desconocido'));
  }, [url]);

  return (
    <Link to={`/${route}/${id}`} title={`Ir a ${label}`}>
      <button style={{ 
        fontSize: '0.9rem', 
        padding: '6px 12px', 
        background: '#333', 
        borderColor: '#555', 
        margin: '4px',
        color: '#eee',
        cursor: 'pointer'
      }}>
        {label}
      </button>
    </Link>
  );
}
// ------------------------

function ItemDetail() {
  const { category, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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

  if (loading) return <h2 style={{textAlign: 'center', color: '#ffe81f'}}>Cargando datos... ⏳</h2>;
  if (!data) return <h2 style={{textAlign: 'center', color: 'red'}}>No encontrado</h2>;

  const ignoredKeys = ['created', 'edited', 'url'];

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center', color: '#ffe81f', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        {data.name || data.title}
      </h1>
      
      <div style={{ padding: '30px', background: '#1e1e1e', borderRadius: '16px', border: '1px solid #333' }}>
        {Object.entries(data).map(([key, value]) => {
          if (ignoredKeys.includes(key)) return null;

          // CASO 1: Dato simple (Texto)
          if (typeof value === 'string') {
            if (key === 'homeworld') {
               // Usamos el nuevo componente también para el planeta de origen
               return (
                 <div key={key} style={{ borderBottom: '1px solid #333', padding: '8px 0' }}>
                   <strong style={{ color: '#ffe81f', textTransform: 'capitalize' }}>{key}: </strong>
                   <div style={{ display: 'inline-block' }}>
                     <RelatedButton url={value} categoryKey={key} />
                   </div>
                 </div>
               )
            }
            return (
              <p key={key} style={{ borderBottom: '1px solid #333', padding: '8px 0', color: '#ccc', margin: 0 }}>
                <strong style={{ color: '#ffe81f', textTransform: 'capitalize' }}>{key.replace('_', ' ')}:</strong> {value}
              </p>
            );
          }

          // CASO 2: Listas de enlaces (Arrays)
          if (Array.isArray(value) && value.length > 0) {
            return (
              <div key={key} style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                <strong style={{ color: '#ffe81f', textTransform: 'capitalize', display: 'block', marginBottom: '8px' }}>
                  {key.replace('_', ' ')}:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {value.map((url) => (
                    // Aquí usamos el componente mágico que busca el nombre
                    <RelatedButton key={url} url={url} categoryKey={key} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to={`/${category}`}>
          <button style={{ fontSize: '1rem', padding: '10px 30px' }}>⬅ Volver a {category}</button>
        </Link>
      </div>
    </div>
  );
}

export default ItemDetail;