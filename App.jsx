import { useState } from "react"
import AddProduct from "./pages/AddProduct"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const [tab, setTab] = useState("add")

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#2d6a4f" }}>♻️ EcoCycle</h1>
      <p style={{ color: "#555" }}>Turn expired products into recycling action</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {["add", "dashboard"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
              background: tab === t ? "#2d6a4f" : "#eee",
              color: tab === t ? "white" : "#333", fontWeight: 600
            }}>
            {t === "add" ? "Add Product" : "Dashboard"}
          </button>
        ))}
      </div>

      {tab === "add"       && <AddProduct />}
      {tab === "dashboard" && <Dashboard />}
    </div>
  )
}