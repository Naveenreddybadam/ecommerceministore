import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/cartcontext";

export default function Navbar() {
  const { totals } = useCart();

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <Link to="/" className="brand">MiniStore</Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? "active" : ""}>
            Cart <span className="badge">{totals.items}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
