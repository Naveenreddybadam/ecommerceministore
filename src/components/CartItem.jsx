import { useCart } from "../context/cartcontext";

export default function CartItem({ item }) {
  const { removeFromCart, setQty } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-info">
        <h4>{item.title}</h4>
        <p className="muted">{item.category}</p>
        <div className="qty-row">
          <label>Qty:</label>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => setQty(item.id, Number(e.target.value))}
          />
          <button className="link danger" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      </div>
      <div className="cart-price">
        <div>${item.price.toFixed(2)}</div>
        <div className="muted small">x {item.qty}</div>
        <div className="line-total">${(item.price * item.qty).toFixed(2)}</div>
      </div>
    </div>
  );
}
