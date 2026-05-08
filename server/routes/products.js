const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

const productsPath = path.join(
  __dirname,
  "../data/products.json"
)

router.get("/", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(productsPath)
  )

  res.json(products)
})

module.exports = router