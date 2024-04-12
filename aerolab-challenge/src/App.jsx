import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Toaster } from "react-hot-toast";
import ProductList from './components/ProductList'; 
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div>
      <Toaster position="top-left" reverseOrder={false} />
      <QueryClientProvider client={new QueryClient()}>
        <Switch>
          <Route path="/" component={ProductList} />
          <Route path="/product/:id" component={ProductDetails} />
        </Switch>
      </QueryClientProvider>
    </div>
  );
}

export default App
