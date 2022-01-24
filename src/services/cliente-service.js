const clienteModel = require("./../models/cliente")

module.exports = {
    buscarTodos: async () => {
        try {
            return await clienteModel.find()
        } catch (error) {
            throw { mensagem: error.message, status: 500 }
        }
    },
    buscarPorId: async (id) => {
        try {
            return await clienteModel.findOne({ _id: id })
        } catch (error) {
            throw { mensagem: error.message, status: 500 }
        }
    },
    cadastrar: async (cliente) => {
        try {
            // TODO: validação do CPF
            return await clienteModel.create(cliente)
        } catch (error) {
            throw { mensagem: error.message, status: 500 }
        }
    },
    atualizar: async (id, cliente) => {
        try {
            // TODO: validação do CPF
            return await clienteModel.updateOne({ _id: id }, cliente)
        } catch (error) {
            throw { mensagem: error.message, status: 500 }
        }
    },
    remover: async (id) => {
        try {
            return await clienteModel.delete({ _id: id })
        } catch (error) {
            throw { mensagem: error.message, status: 500 }
        }
    }
}