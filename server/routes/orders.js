const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    message: "Rota de pedidos funcionando",
    orders: [],
  })
})

module.exports = router