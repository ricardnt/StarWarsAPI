import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import ItemDetail from './pages/ItemDetail';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      
      {/* Definición de las rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Ruta dinámica: :category capturará "people", "films", etc. */}
        <Route path="/:category" element={<ItemList />} />
        
        {/* Ruta para detalles: capturamos categoría e ID */}
        <Route path="/:category/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  );
}

export default App;