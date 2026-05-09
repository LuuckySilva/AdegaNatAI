const protectAdmin = require("../middleware/auth")
const express = require("express")
const pool = require("../db")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        category,
        price,
        stock,
        image,
        description,
        active,
        is_promotion AS "isPromotion",
        promo_valid_until AS "promoValidUntil"
      FROM products
      ORDER BY id ASC
    `)

    res.json(result.rows)
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    res.status(500).json({
      message: "Erro ao buscar produtos.",
    })
  }
})

router.post("/", protectAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      image,
      description,
      active,
      isPromotion,
      promoValidUntil,
    } = req.body

    const result = await pool.query(
      `
      INSERT INTO products
      (
        name,
        category,
        price,
        stock,
        image,
        description,
        active,
        is_promotion,
        promo_valid_until
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
        id,
        name,
        category,
        price,
        stock,
        image,
        description,
        active,
        is_promotion AS "isPromotion",
        promo_valid_until AS "promoValidUntil"
      `,
      [
        name,
        category,
        Number(price),
        Number(stock),
        image,
        description || "",
        active ?? true,
        isPromotion ?? false,
        promoValidUntil || null,
      ]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error("Erro ao criar produto:", error)
    res.status(500).json({
      message: "Erro ao criar produto.",
    })
  }
})

router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const productId = Number(req.params.id)

    const {
      name,
      category,
      price,
      stock,
      image,
      description,
      active,
      isPromotion,
      promoValidUntil,
    } = req.body

    const result = await pool.query(
      `
      UPDATE products
      SET
        name = $1,
        category = $2,
        price = $3,
        stock = $4,
        image = $5,
        description = $6,
        active = $7,
        is_promotion = $8,
        promo_valid_until = $9
      WHERE id = $10
      RETURNING
        id,
        name,
        category,
        price,
        stock,
        image,
        description,
        active,
        is_promotion AS "isPromotion",
        promo_valid_until AS "promoValidUntil"
      `,
      [
        name,
        category,
        Number(price),
        Number(stock),
        image,
        description || "",
        active ?? true,
        isPromotion ?? false,
        promoValidUntil || null,
        productId,
      ]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Erro ao atualizar produto:", error)
    res.status(500).json({
      message: "Erro ao atualizar produto.",
    })
  }
})

router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const productId = Number(req.params.id)

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [productId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      })
    }

    res.json({
      message: "Produto removido com sucesso.",
    })
  } catch (error) {
    console.error("Erro ao remover produto:", error)
    res.status(500).json({
      message: "Erro ao remover produto.",
    })
  }
})

module.exports = router