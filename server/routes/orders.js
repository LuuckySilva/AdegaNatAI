const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

const ordersPath = path.join(__dirname, "../data/orders.json")
const productsPath = path.join(__dirname, "../data/products.json")

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"))
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

router.get("/", (req, res) => {
  const orders = readJson(ordersPath)
  res.json(orders)
})

router.post("/", (req, res) => {
  const orders = readJson(ordersPath)
  const products = readJson(productsPath)

  const orderProducts = req.body.products || []

  const updatedProducts = products.map((product) => {
    const itemInOrder = orderProducts.find((item) => item.id === product.id)

    if (!itemInOrder) return product

    return {
      ...product,
      stock: Math.max(0, product.stock - itemInOrder.quantity),
    }
  })

  const newOrder = {
    id: orders.length + 1,
    number: orders.length + 1,
    customerName: req.body.customerName,
    customerPhone: req.body.customerPhone,
    address: req.body.address,
    paymentMethod: req.body.paymentMethod,
    deliveryTax: Number(req.body.deliveryTax || 0),
    notes: req.body.notes || "",
    products: orderProducts,
    total: Number(req.body.total || 0),
    status: "Novo",
    createdAt: new Date().toISOString(),
  }

  orders.unshift(newOrder)

  saveJson(productsPath, updatedProducts)
  saveJson(ordersPath, orders)

  res.status(201).json(newOrder)
})

router.put("/:id/status", (req, res) => {
  const orders = readJson(ordersPath)
  const orderId = Number(req.params.id)

  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status: req.body.status } : order
  )

  saveJson(ordersPath, updatedOrders)

  const updatedOrder = updatedOrders.find((order) => order.id === orderId)

  res.json(updatedOrder)
})

router.delete("/:id", (req, res) => {
  const orders = readJson(ordersPath)
  const orderId = Number(req.params.id)

  const updatedOrders = orders.filter((order) => order.id !== orderId)

  saveJson(ordersPath, updatedOrders)

  res.json({
    message: "Pedido removido com sucesso.",
  })
})

module.exports = router