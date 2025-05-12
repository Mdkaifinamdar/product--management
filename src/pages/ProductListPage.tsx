import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const containerStyle = {
  maxWidth: "700px",
  margin: "40px auto",
  padding: "24px",
  background: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
};

const titleStyle = {
  textAlign: "center" as const,
  fontSize: "2rem",
  marginBottom: "20px",
  color: "#222"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  background: "#fff"
};

const thStyle = {
  padding: "12px 16px",
  borderBottom: "2px solid #e0e0e0",
  background: "#222",
  color: "#fff",
  textAlign: "left" as const,
  fontWeight: 600,
  fontSize: "16px"
};

const tdStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #e0e0e0",
  fontSize: "15px",
  color: "#222"
};

const actionLinkStyle = {
  color: "#1976d2",
  textDecoration: "none",
  fontWeight: 500
};

const ProductListPage = () => {
  const { products } = useProductContext();

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Product List</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={tdStyle}>{product.name}</td>
              <td style={tdStyle}>${product.price}</td>
              <td style={tdStyle}>{product.category}</td>
              <td style={tdStyle}>
                <Link to={`/edit/${product.id}`} style={actionLinkStyle}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td style={tdStyle} colSpan={4}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
