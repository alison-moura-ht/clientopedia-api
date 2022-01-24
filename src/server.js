const express = require("express")
const cors = require("cors")
const clienteRoute = require("./routes/cliente-route")
const usuarioRoute = require("./routes/usuario-route")
const api = express()
const db = require("./db")

db.connect()

api.use(express.json()) // Habilita req com body em JSON
api.use(cors({ // Libera o CORS de qualquer origem
    origin: "*"
}))

api.use("/clientes", clienteRoute)
api.use("/usuarios", usuarioRoute)

api.get("/", (req, res) => {
    res.json({ mensagem: "API Clientopedia" })
})

module.exports = api