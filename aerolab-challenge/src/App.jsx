import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProductsProvider } from './context/ProductsProvider';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <div>
          <Navbar />
          <Toaster position="top-left" reverseOrder={false} />
          <QueryClientProvider client={new QueryClient()}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/:id" element={<ProductDetails />} />
            </Routes>
          </QueryClientProvider>
          <Footer />
        </div>
      </ProductsProvider>
    </Router>
  );
}

export default App;
