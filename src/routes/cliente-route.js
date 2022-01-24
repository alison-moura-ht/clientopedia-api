const express = require("express")
const clienteService = require("./../services/cliente-service")
const { verificar } = require("./../middlewares/auth-middleware")
const router = express.Router()

// Rota buscar todos
router.get("/", verificar, async (req, res) => {
    // buscar os clientes no bd
    const clientes = await clienteService.buscarTodos()
    res.json(clientes)
})

// Rota cadastro
router.post("/", verificar, async (req, res) => {
    // insere um cliente no bd
    const resultado = await clienteService.cadastrar(req.body)
    res.json(resultado)
})

// Rota atualização
router.put("/:id", verificar, async (req, res) => {
    // atualiza um cliente no bd
    const resultado = await clienteService.atualizar(req.params.id, req.body)
    res.json(resultado)
})

// Rota remoção
router.delete("/:id", verificar, async (req, res) => {
    // remove um cliente no bd
    const resultado = await clienteService.remover(req.params.id)
    res.json(resultado)
})

module.exports = router