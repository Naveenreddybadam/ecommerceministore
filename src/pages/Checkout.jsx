import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontext";
import { useState } from "react";

export default function Checkout() {
  const { cart, totals, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const placeOrder = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 2000);
  };

  if (placed) {
    return (
      <section className="checkout">
        <h2>🎉 Order placed!</h2>
        <p className="muted">You’ll be redirected to Home in a moment…</p>
      </section>
    );
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Shipping Details</h3>
          <input className="input" placeholder="Full Name" required />
          <input className="input" placeholder="Email" type="email" required />
          <input className="input" placeholder="Address" required />
          <div className="row">
            <input className="input" placeholder="City" required />
            <input className="input" placeholder="ZIP" required />
          </div>
          <h3>Payment</h3>
          <input className="input" placeholder="Card Number" required />
          <div className="row">
            <input className="input" placeholder="MM/YY" required />
            <input className="input" placeholder="CVC" required />
          </div>
          <button className="btn wide" type="submit">
            Pay ${totals.grandTotal.toFixed(2)}
          </button>
        </form>

        <aside className="order-box">
          <h3>Order Summary</h3>
          <ul className="mini-list">
            {cart.map((i) => (
              <li key={i.id}>
                <span>{i.title.length > 30 ? i.title.slice(0,30) + "…" : i.title}</span>
                <span>x{i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-row"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${totals.grandTotal.toFixed(2)}</span></div>
        </aside>
      </div>
    </section>
  );
}
