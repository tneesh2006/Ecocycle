import { useState } from "react"

const CATEGORIES = ["food","medicine","cosmetics","electronics","plastic","paper","glass","battery","dairy","clothing","oil","chemicals"]

export default function AddProduct() {
  const [form, setForm]     = useState({ name:"", category:"food", expiry_date:"", weight_kg:"0.5" })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  const submit = async () => {
    if (!form.name) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError("Could not connect to backend. Make sure Flask is running!")
    }
    setLoading(false)
  }

  const reset = () => {
    setResult(null)
    setForm({ name:"", category:"food", expiry_date:"", weight_kg:"0.5" })
  }

  return (
    <div>
      <h2>Add Expired Product</h2>

      {/* Error message */}
      {error && (
        <div style={{
          padding: 16, marginBottom: 16,
          background: "#fff0f0", borderRadius: 10,
          borderLeft: "4px solid #e53e3e", color: "#c53030"
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Success message */}
      {result && (
        <div style={{
          marginBottom: 24, padding: 24,
          background: "#f0faf4", borderRadius: 16,
          borderLeft: "5px solid #2d6a4f",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
        }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <span style={{ fontSize:32 }}>✅</span>
            <div>
              <h3 style={{ margin:0, color:"#2d6a4f" }}>{result.product.name}</h3>
              <span style={{
                fontSize:12, background:"#2d6a4f", color:"white",
                padding:"2px 10px", borderRadius:20
              }}>
                {result.product.category}
              </span>
            </div>
          </div>

          {/* Recycling method */}
          <div style={{
            background:"white", borderRadius:10, padding:16,
            marginBottom:16, border:"1px solid #c6e6d4"
          }}>
            <p style={{ margin:0, fontSize:13, color:"#666" }}>Recommended recycling method</p>
            <p style={{ margin:"4px 0 0", fontSize:20, fontWeight:700, color:"#2d6a4f" }}>
              ♻️ {result.product.recycling_method}
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:12, marginBottom:16 }}>
            <div style={{
              flex:1, background:"white", borderRadius:10,
              padding:12, textAlign:"center", border:"1px solid #c6e6d4"
            }}>
              <div style={{ fontSize:22, fontWeight:700, color:"#2d6a4f" }}>
                {result.product.weight_kg} kg
              </div>
              <div style={{ fontSize:12, color:"#666" }}>Waste diverted</div>
            </div>
            <div style={{
              flex:1, background:"white", borderRadius:10,
              padding:12, textAlign:"center", border:"1px solid #c6e6d4"
            }}>
              <div style={{ fontSize:22, fontWeight:700, color:"#2d6a4f" }}>
                {(result.product.weight_kg * 0.6).toFixed(2)} kg
              </div>
              <div style={{ fontSize:12, color:"#666" }}>CO₂ saved</div>
            </div>
          </div>

          {/* Nearest centers */}
          <div style={{ background:"white", borderRadius:10, padding:16, border:"1px solid #c6e6d4" }}>
            <p style={{ margin:"0 0 10px", fontWeight:600, color:"#2d6a4f" }}>
              📍 Nearest Recycling Centers
            </p>
            {[
              { name:"EcoWaste Center",    distance:"3km", type:"General" },
              { name:"GreenRecycle Hub",   distance:"5km", type:"Chemical" },
              { name:"City Compost Plant", distance:"2km", type:"Organic" },
            ].map(c => (
              <div key={c.name} style={{
                display:"flex", justifyContent:"space-between",
                alignItems:"center", padding:"8px 0",
                borderBottom:"1px solid #eee"
              }}>
                <div>
                  <span style={{ fontWeight:500 }}>📌 {c.name}</span>
                  <span style={{
                    marginLeft:8, fontSize:11, background:"#e8f5e9",
                    color:"#2d6a4f", padding:"2px 8px", borderRadius:20
                  }}>{c.type}</span>
                </div>
                <span style={{ color:"#666", fontSize:14 }}>{c.distance}</span>
              </div>
            ))}
          </div>

          {/* Add another button */}
          <button onClick={reset} style={{
            marginTop:16, width:"100%", padding:12,
            background:"white", color:"#2d6a4f",
            border:"2px solid #2d6a4f", borderRadius:8,
            cursor:"pointer", fontWeight:600, fontSize:15
          }}>
            + Add Another Product
          </button>
        </div>
      )}

      {/* Form — hides after success */}
      {!result && (
        <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:400 }}>
          <input placeholder="Product name (e.g. Bread)"
            value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            style={inputStyle} />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
            style={inputStyle}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="date" value={form.expiry_date}
            onChange={e => setForm({...form, expiry_date: e.target.value})}
            style={inputStyle} />
          <input type="number" placeholder="Weight (kg)" value={form.weight_kg}
            onChange={e => setForm({...form, weight_kg: e.target.value})}
            style={inputStyle} />
          <button onClick={submit} disabled={loading || !form.name}
            style={{
              padding:"12px", background: !form.name ? "#ccc" : "#2d6a4f",
              color:"white", border:"none", borderRadius:8,
              cursor: !form.name ? "not-allowed" : "pointer", fontWeight:600, fontSize:15
            }}>
            {loading ? "⏳ Processing..." : "Get Recycling Suggestion →"}
          </button>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  padding: "10px 14px", borderRadius: 8,
  border: "1px solid #ccc", fontSize: 15
}