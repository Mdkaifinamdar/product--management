import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const formContainerStyle = {
  maxWidth: "400px",
  margin: "40px auto",
  padding: "32px",
  background: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
};

const titleStyle = {
  textAlign: "center" as const,
  fontSize: "1.7rem",
  marginBottom: "20px",
  color: "#222"
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
  color: "#333"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "18px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "15px",
  background: "#fff",
  color: "#000"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontWeight: 600,
  fontSize: "16px",
  cursor: "pointer"
};

const ProductFormPage = () => {
  const { addProduct, updateProduct, products } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === id);
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
      }
    }
  }, [id, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      category,
    };
    if (id) {
      updateProduct(id, productData);
    } else {
      addProduct(productData);
    }
    navigate("/");
  };

  return (
    <div style={formContainerStyle}>
      <h1 style={titleStyle}>{id ? "Edit Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            style={inputStyle}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" style={labelStyle}>Description</label>
          <textarea
            id="description"
            value={description}
            style={{ ...inputStyle, minHeight: "70px", resize: "vertical" as const, color: "#000" }}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price" style={labelStyle}>Price</label>
          <input
            type="number"
            id="price"
            value={price}
            style={inputStyle}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            step="5"
          />
        </div>
        <div>
          <label htmlFor="category" style={labelStyle}>Category</label>
          <input
            type="text"
            id="category"
            value={category}
            style={inputStyle}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ProductFormPage;
