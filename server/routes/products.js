const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

const productsPath = path.join(__dirname, "../data/products.json")

function readProducts() {
  return JSON.parse(fs.readFileSync(productsPath, "utf-8"))
}

function saveProducts(products) {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2))
}

router.get("/", (req, res) => {
  const products = readProducts()
  res.json(products)
})

router.post("/", (req, res) => {
  const products = readProducts()

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    image: req.body.image,
    description: req.body.description || "",
    active: req.body.active ?? true,
    isPromotion: req.body.isPromotion ?? false,
    promoValidUntil: req.body.promoValidUntil || "",
  }

  products.push(newProduct)
  saveProducts(products)

  res.status(201).json(newProduct)
})

router.put("/:id", (req, res) => {
  const products = readProducts()
  const productId = Number(req.params.id)

  const productExists = products.some((product) => product.id === productId)

  if (!productExists) {
    return res.status(404).json({
      message: "Produto não encontrado.",
    })
  }

  const updatedProducts = products.map((product) =>
    product.id === productId
      ? {
          ...product,
          ...req.body,
          id: productId,
          price: Number(req.body.price ?? product.price),
          stock: Number(req.body.stock ?? product.stock),
        }
      : product
  )

  saveProducts(updatedProducts)

  const updatedProduct = updatedProducts.find(
    (product) => product.id === productId
  )

  res.json(updatedProduct)
})

router.delete("/:id", (req, res) => {
  const products = readProducts()
  const productId = Number(req.params.id)

  const productExists = products.some((product) => product.id === productId)

  if (!productExists) {
    return res.status(404).json({
      message: "Produto não encontrado.",
    })
  }

  const updatedProducts = products.filter((product) => product.id !== productId)

  saveProducts(updatedProducts)

  res.json({
    message: "Produto removido com sucesso.",
  })
})

module.exports = router