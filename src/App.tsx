import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsList from './component/productList';
import SelectedProduct from './component/selectedProduct';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products/:id" element={<SelectedProduct/>} />
      </Routes>
    </Router>
  );
}

export default App
