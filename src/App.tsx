import { Link, Outlet } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import './App.css';

function App() {
  return (
    <ProductProvider>
      <div>
        <h1>Product Management</h1>
        <nav>
          <Link to="/add">+ Add Product</Link>
        </nav>
        <Outlet />
      </div>
    </ProductProvider>
  );
}

export default App;
