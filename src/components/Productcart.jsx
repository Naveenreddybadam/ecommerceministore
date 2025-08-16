import { useCart } from "../context/cartcontext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="card">
      <div className="card-img">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-title" title={product.title}>
          {product.title.length > 60 ? product.title.slice(0, 60) + "…" : product.title}
        </h3>
        <p className="muted">{product.category}</p>
        <div className="price-row">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">⭐ {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})</span>
        </div>
        <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
