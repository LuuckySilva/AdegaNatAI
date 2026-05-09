require("dotenv").config()
const pool = require("./db")
const uploadRoutes = require("./routes/upload")
const express = require("express")
const cors = require("cors")

const productsRoutes = require("./routes/products")
const ordersRoutes = require("./routes/orders")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/upload", uploadRoutes)

app.get("/", (req, res) => {
  res.json({
    message: "Adega Nat AI API online 🍷",
  })
})

app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)
pool.connect()
  .then(() => {
    console.log("PostgreSQL conectado ✅")
  })
  .catch((err) => {
    console.error("Erro PostgreSQL ❌", err)
  })

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})