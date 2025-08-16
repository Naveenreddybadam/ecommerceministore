import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/Productcart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        const prod = await prodRes.json();
        const cats = await catRes.json();
        setProducts(prod);
        setCategories(["all", ...cats]);
      } catch (e) {
        setErr("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // category
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // sort
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating-desc") list.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));

    return list;
  }, [products, search, category, sort]);

  return (
    <>
      <section className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating: High → Low</option>
        </select>
      </section>

      {loading && <p className="muted">Loading products…</p>}
      {err && <p className="error">{err}</p>}

      <section className="grid">
        {!loading && !err && filtered.length === 0 && (
          <p className="muted">No products match your search.</p>
        )}
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </>
  );
}
