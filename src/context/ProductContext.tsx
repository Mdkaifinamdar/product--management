import { createContext, useState, useEffect, useContext } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface ProductContextType {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const response = await fetch("/products.json");
    const data: Product[] = await response.json();
    setProducts(data);
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = { id: crypto.randomUUID(), ...product };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const value: ProductContextType = {
    products,
    loadProducts,
    addProduct,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
