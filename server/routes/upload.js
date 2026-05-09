const express = require("express")
const multer = require("multer")

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/")
  },

  filename: (req, file, callback) => {
    const uniqueName = Date.now() + "-" + file.originalname

    callback(null, uniqueName)
  },
})

const fileFilter = (req, file, callback) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ]

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(
      new Error(
        "Formato inválido. Use JPG, PNG ou WEBP."
      )
    )
  }
}

const upload = multer({
  storage,
  fileFilter,
})

router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Nenhuma imagem enviada.",
      })
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`

    res.status(201).json({
      imageUrl,
    })
  }
)

module.exports = router