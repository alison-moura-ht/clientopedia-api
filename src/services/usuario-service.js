const jwt = require("jsonwebtoken")
const usuarioModel = require("./../models/usuario")

module.exports = {
    buscarTodos: async () => {
        return await usuarioModel.find()
    },
    cadastrar: async (usuario) => {
        return await usuarioModel.create(usuario)
    },
    atualizar: async (id, usuario) => {
        return await usuarioModel.updateOne({ _id: id }, usuario)
    },
    remover: async (id) => {
        return await usuarioModel.delete({ _id: id })
    },
    autenticar: async (usuario) => {
        try {
            const usuarioEncontrado = await usuarioModel.findOne({ email: usuario.email, senha: usuario.senha }, "_id nome email")
            if (!usuarioEncontrado) {
                throw { mensagem: "Usuário não encontrado", status: 404 }
            } else {
                const token = jwt.sign(JSON.stringify(usuarioEncontrado), "K8Onc2YcSu8v")
                return {
                    token: token,
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    _id: usuarioEncontrado._id
                }
            }
        } catch (error) {
            throw { mensagem: error.mensagem || "Erro interno", status: error.status || 500 }
        }
    }
}