const express = require("express")
const usuarioService = require("./../services/usuario-service")
const { verificar } = require("./../middlewares/auth-middleware")
const router = express.Router()

// Rota buscar todos
router.get("/", verificar, async (req, res) => {
    const resultado = await usuarioService.buscarTodos()
    res.json(resultado)
})

// Rota cadastro
router.post("/", verificar, async (req, res) => {
    const resultado = await usuarioService.cadastrar(req.body)
    res.json(resultado)
})

// Rota de autenticação
router.post("/auth", async (req, res) => {
    try {
        const resultado = await usuarioService.autenticar(req.body)
        res.json(resultado)
    } catch (error) {
        res.status(error.status).json({ mensagem: error.mensagem })
    }
})

// Rota atualização
router.put("/:id", verificar, async (req, res) => {
    const resultado = await usuarioService.atualizar(req.params.id, req.body)
    res.json(resultado)
})

// Rota remoção
router.delete("/:id", verificar, async (req, res) => {
    const resultado = await usuarioService.remover(req.params.id)
    res.json(resultado)
})

// exporta o router
module.exports = router