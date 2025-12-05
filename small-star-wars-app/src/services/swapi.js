const BASE_URL = 'https://swapi.dev/api';

// Obtener lista de recursos (ej: 'people', 'starships', 'films')
// page es opcional para la paginación
export const getResources = async (category, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/${category}/?page=${page}`);
    if (!response.ok) throw new Error('Error en la petición');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener detalles de un elemento específico usando su URL o ID
export const getItemDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error obteniendo detalles');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función auxiliar para obtener el ID desde la URL de SWAPI
// (SWAPI devuelve urls como "https://swapi.dev/api/people/1/", necesitamos el "1")
export const getIdFromUrl = (url) => {
  const segments = url.split('/').filter(Boolean);
  return segments[segments.length - 1];
};