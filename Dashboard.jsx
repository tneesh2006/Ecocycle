import { useEffect, useState } from "react"

export default function Dashboard() {
  const [stats, setStats]       = useState(null)
  const [products, setProducts] = useState([])

  const fetchData = () => {
    fetch("http://localhost:5000/api/stats").then(r => r.json()).then(setStats)
    fetch("http://localhost:5000/api/products").then(r => r.json()).then(setProducts)
  }

  useEffect(() => { fetchData() }, [])

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" })
    fetchData()
  }

  if (!stats) return <p>Loading...</p>

  const cards = [
    { label: "Products Recycled", value: stats.total_products,    icon: "♻️" },
    { label: "Waste Diverted",    value: `${stats.total_weight_kg} kg`, icon: "🌿" },
    { label: "CO₂ Saved",         value: `${stats.co2_saved_kg} kg`,    icon: "🌍" },
  ]

  return (
    <div>
      <h2>Impact Dashboard</h2>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
        {cards.map(c => (
          <div key={c.label} style={{
            flex:1, minWidth:160, padding:20, background:"#f0faf4",
            borderRadius:12, textAlign:"center"
          }}>
            <div style={{ fontSize:32 }}>{c.icon}</div>
            <div style={{ fontSize:28, fontWeight:700, color:"#2d6a4f" }}>{c.value}</div>
            <div style={{ color:"#555", fontSize:14 }}>{c.label}</div>
          </div>
        ))}
      </div>

      <h3>Recent Products</h3>
      {products.length === 0 ? (
        <p style={{ color:"#888" }}>No products added yet.</p>
      ) : (
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"#e8f5e9" }}>
              {["Name","Category","Method","Weight",""].map(h => (
                <th key={h} style={{ padding:"8px 12px", textAlign:"left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom:"1px solid #eee" }}>
                <td style={{ padding:"8px 12px" }}>{p.name}</td>
                <td style={{ padding:"8px 12px" }}>{p.category}</td>
                <td style={{ padding:"8px 12px", color:"#2d6a4f" }}>{p.recycling_method}</td>
                <td style={{ padding:"8px 12px" }}>{p.weight_kg} kg</td>
                <td style={{ padding:"8px 12px" }}>
                  <button onClick={() => deleteProduct(p.id)} style={{
                    background:"#fff0f0", color:"#e53e3e",
                    border:"1px solid #e53e3e", borderRadius:6,
                    padding:"4px 10px", cursor:"pointer", fontSize:13
                  }}>
                    🗑 Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}