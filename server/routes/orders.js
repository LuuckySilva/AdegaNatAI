const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

const ordersPath = path.join(__dirname, "../data/orders.json")

function readOrders() {
  return JSON.parse(fs.readFileSync(ordersPath, "utf-8"))
}

function saveOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2))
}

router.get("/", (req, res) => {
  const orders = readOrders()
  res.json(orders)
})

router.post("/", (req, res) => {
  const orders = readOrders()

  const newOrder = {
    id: Date.now(),

    number: orders.length + 1,

    customerName: req.body.customerName,
    customerPhone: req.body.customerPhone,
    address: req.body.address,

    paymentMethod: req.body.paymentMethod,
    deliveryTax: Number(req.body.deliveryTax || 0),

    notes: req.body.notes || "",

    products: req.body.products || [],

    total: Number(req.body.total || 0),

    status: "Novo",

    createdAt: new Date().toISOString(),
  }

  orders.unshift(newOrder)

  saveOrders(orders)

  res.status(201).json(newOrder)
})

router.put("/:id/status", (req, res) => {
  const orders = readOrders()

  const orderId = Number(req.params.id)

  const orderExists = orders.some(
    (order) => order.id === orderId
  )

  if (!orderExists) {
    return res.status(404).json({
      message: "Pedido não encontrado.",
    })
  }

  const updatedOrders = orders.map((order) =>
    order.id === orderId
      ? {
          ...order,
          status: req.body.status,
        }
      : order
  )

  saveOrders(updatedOrders)

  const updatedOrder = updatedOrders.find(
    (order) => order.id === orderId
  )

  res.json(updatedOrder)
})

router.delete("/:id", (req, res) => {
  const orders = readOrders()

  const orderId = Number(req.params.id)

  const orderExists = orders.some(
    (order) => order.id === orderId
  )

  if (!orderExists) {
    return res.status(404).json({
      message: "Pedido não encontrado.",
    })
  }

  const updatedOrders = orders.filter(
    (order) => order.id !== orderId
  )

  saveOrders(updatedOrders)

  res.json({
    message: "Pedido removido com sucesso.",
  })
})

module.exports = router