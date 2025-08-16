import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/cartcontext";

export default function Cart() {
  const { cart, totals } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <section className="empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn">Go shopping</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.map((item) => <CartItem key={item.id} item={item} />)}
      </div>

      <aside className="summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Items</span><span>{totals.items}</span>
        </div>
        <div className="summary-row">
          <span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span><span>${totals.shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8%)</span><span>${totals.tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span><span>${totals.grandTotal.toFixed(2)}</span>
        </div>
        <button className="btn wide" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        <Link to="/" className="link">Continue shopping</Link>
      </aside>
    </section>
  );
}
