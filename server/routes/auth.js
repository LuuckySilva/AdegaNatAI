const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const router = express.Router()

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    if (
      username !== ADMIN_USER ||
      password !== ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Usuário ou senha inválidos.",
      })
    }

    const token = jwt.sign(
      {
        username,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    res.json({
      token,
      user: {
        username,
        role: "admin",
      },
    })
  } catch (error) {
    console.error("Erro login:", error)

    res.status(500).json({
      message: "Erro interno login.",
    })
  }
})

module.exports = router