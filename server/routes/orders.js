const protectAdmin = require("../middleware/auth")

const pool = require("../db")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        id AS number,
        customer_name AS "customerName",
        customer_phone AS "customerPhone",
        address,
        payment_method AS "paymentMethod",
        delivery_tax AS "deliveryTax",
        notes,
        products,
        total,
        status,
        created_at AS "createdAt"
      FROM orders
      ORDER BY id DESC
    `)

    res.json(result.rows)
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error)
    res.status(500).json({
      message: "Erro ao buscar pedidos.",
    })
  }
})

router.post("/", async (req, res) => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const orderProducts = req.body.products || []

    for (const item of orderProducts) {
      await client.query(
        `
        UPDATE products
        SET stock = GREATEST(stock - $1, 0)
        WHERE id = $2
        `,
        [Number(item.quantity), Number(item.id)]
      )
    }

    const result = await client.query(
      `
      INSERT INTO orders
      (
        customer_name,
        customer_phone,
        address,
        payment_method,
        delivery_tax,
        notes,
        products,
        total,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Novo')
      RETURNING
        id,
        id AS number,
        customer_name AS "customerName",
        customer_phone AS "customerPhone",
        address,
        payment_method AS "paymentMethod",
        delivery_tax AS "deliveryTax",
        notes,
        products,
        total,
        status,
        created_at AS "createdAt"
      `,
      [
        req.body.customerName,
        req.body.customerPhone,
        req.body.address,
        req.body.paymentMethod,
        Number(req.body.deliveryTax || 0),
        req.body.notes || "",
        JSON.stringify(orderProducts),
        Number(req.body.total || 0),
      ]
    )

    await client.query("COMMIT")

    res.status(201).json(result.rows[0])
  } catch (error) {
    await client.query("ROLLBACK")

    console.error("Erro ao criar pedido:", error)
    res.status(500).json({
      message: "Erro ao criar pedido.",
    })
  } finally {
    client.release()
  }
})

router.put("/:id/status", protectAdmin, async (req, res) => {
  try {
    const orderId = Number(req.params.id)

    const result = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING
        id,
        id AS number,
        customer_name AS "customerName",
        customer_phone AS "customerPhone",
        address,
        payment_method AS "paymentMethod",
        delivery_tax AS "deliveryTax",
        notes,
        products,
        total,
        status,
        created_at AS "createdAt"
      `,
      [req.body.status, orderId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Erro ao atualizar status:", error)
    res.status(500).json({
      message: "Erro ao atualizar status.",
    })
  }
})

router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const orderId = Number(req.params.id)

    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING id",
      [orderId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      })
    }

    res.json({
      message: "Pedido removido com sucesso.",
    })
  } catch (error) {
    console.error("Erro ao remover pedido:", error)
    res.status(500).json({
      message: "Erro ao remover pedido.",
    })
  }
})

module.exports = router